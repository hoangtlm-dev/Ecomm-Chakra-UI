import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { ACTION_TYPES, MESSAGES, PAGINATION } from '@app/constants'

// Types
import { Category, CategoryAction, ExtendedQueryParams, ICategoryState, PaginationResponse } from '@app/types'

// Services
import { getCategoriesService } from '@app/services'

// Reducers
import { categoryReducer } from '@app/reducers'

const initialState: ICategoryState = {
  // Category list
  isCategoryListLoading: true,
  categoryList: {
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
  categoryListError: null
}

export interface ICategoryContextType {
  state: ICategoryState
  dispatch: Dispatch<CategoryAction>
  fetchCategories: (params?: ExtendedQueryParams<Partial<Category>>) => Promise<void>
}

export const CategoryContext = createContext<ICategoryContextType | null>(null)

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState)

  const fetchCategories = useCallback(async (params: ExtendedQueryParams<Partial<Category>> = {}) => {
    dispatch({ type: ACTION_TYPES.FETCH_CATEGORIES_PENDING })

    const defaultParams: ExtendedQueryParams<Partial<Category>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'asc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      ...params
    }

    try {
      const response: PaginationResponse<Category> = await getCategoriesService(defaultParams)
      dispatch({ type: ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_CATEGORIES_FAILURE, payload: MESSAGES.FETCH_CATEGORIES_FAILED })
    }
  }, [])

  const categoryContextValue: ICategoryContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchCategories
    }),
    [state, fetchCategories]
  )

  return <CategoryContext.Provider value={categoryContextValue}>{children}</CategoryContext.Provider>
}

export default CategoryProvider
