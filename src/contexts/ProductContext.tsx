import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { ACTION_TYPES, MESSAGES, PAGINATION } from '@app/constants'

// Types
import {
  ExtendedQueryParams,
  IProductState,
  PaginationResponse,
  Product,
  ProductAction,
  ProductParams
} from '@app/types'

// Services
import { getCurrentProductService, getProductsService } from '@app/services'

// Reducers
import { productReducer } from '@app/reducers'

const initialState: IProductState = {
  // Product list
  isProductListLoading: true,
  productList: {
    data: [],
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE,
    page: 1,
    hasPrevPage: false,
    hasNextPage: true,
    prevPage: null,
    nextPage: null,
    totalItems: 0,
    totalPages: 0
  },
  productListError: null,

  // Product details
  isCurrentProductLoading: true,
  currentProduct: {
    id: 0,
    name: '',
    description: '',
    colors: [''],
    price: 0,
    currencyUnit: '',
    quantity: 0,
    discount: 0,
    image: '',
    ratingStar: 0,
    reviewNumber: 0,
    isHotDeal: false,
    categoryId: 0,
    categoryName: ''
  },
  currentProductError: null,

  //listType
  listType: (localStorage.getItem('listType') as 'grid' | 'list') || 'grid'
}

export interface IProductContextType {
  state: IProductState
  dispatch: Dispatch<ProductAction>
  fetchProducts: (params?: Partial<ExtendedQueryParams<ProductParams>>) => Promise<void>
  fetchCurrentProduct: (productId: number) => Promise<void>
  setListType: (listType: 'grid' | 'list') => void
}

export const ProductContext = createContext<IProductContextType | null>(null)

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState)

  const fetchProducts = useCallback(async (params: Partial<ExtendedQueryParams<ProductParams>> = {}) => {
    dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS_PENDING })

    const defaultParams: Partial<ExtendedQueryParams<ProductParams>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'desc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      price_gte: params.price_gte ?? 0,
      price_lte: params.price_gte ?? 1000
    }

    try {
      const response: PaginationResponse<Product> = await getProductsService({ ...defaultParams, ...params })
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCTS_ERROR, payload: MESSAGES.FETCH_PRODUCTS_FAILED })
    }
  }, [])

  const fetchCurrentProduct = useCallback(async (productId: number) => {
    dispatch({ type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_PENDING })
    try {
      const response = await getCurrentProductService(productId)
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_ERROR, payload: MESSAGES.FETCH_PRODUCT_DETAILS_FAILED })
    }
  }, [])

  const setListType = useCallback((type: 'grid' | 'list') => {
    dispatch({ type: ACTION_TYPES.SET_LIST_TYPE, payload: type })
  }, [])

  const productContextValue: IProductContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchProducts,
      fetchCurrentProduct,
      setListType
    }),
    [state, fetchProducts, fetchCurrentProduct, setListType]
  )

  return <ProductContext.Provider value={productContextValue}>{children}</ProductContext.Provider>
}

export default ProductProvider
