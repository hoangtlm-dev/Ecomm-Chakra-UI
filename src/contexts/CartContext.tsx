import { createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer } from 'react'

// Constants
import { ACTION_TYPES, MESSAGES, PAGINATION } from '@app/constants'

// Types
import { CartAction, CartItem, ExtendedQueryParams, ICartState, PaginationResponse } from '@app/types'

// Services
import { addToCartService, getCartService, removeFromCartService } from '@app/services'

// Reducers
import { cartReducer } from '@app/reducers'

const initialState: ICartState = {
  // Cart
  isCartLoading: true,
  cart: {
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
  cartError: null,

  // Add to cart
  isAddToCartLoading: false,
  addToCartError: null,

  // Remove from cart
  isRemoveFromCartLoading: false,
  removeFromCartError: null
}

export interface ICartContextType {
  state: ICartState
  dispatch: Dispatch<CartAction>
  addToCart: (cart: CartItem) => Promise<void>
  fetchCart: (params?: Partial<ExtendedQueryParams<CartItem>>) => Promise<void>
  increaseQuantity: (cartId: number) => void
  decreaseQuantity: (cartId: number) => void
  changeQuantity: (cartId: number, quantity: number) => void
  removeFromCart: (cartId: number) => Promise<void>
}

export const CartContext = createContext<ICartContextType | null>(null)

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const fetchCart = useCallback(async (params: Partial<ExtendedQueryParams<CartItem>> = {}) => {
    dispatch({ type: ACTION_TYPES.FETCH_CART_PENDING })

    const defaultParams: Partial<ExtendedQueryParams<CartItem>> = {
      _sort: params._sort ?? 'id',
      _order: params._order ?? 'desc',
      limit: params.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      id: params.id ?? 0,
      ...params
    }

    try {
      const response: PaginationResponse<CartItem> = await getCartService(defaultParams)
      dispatch({ type: ACTION_TYPES.FETCH_CART_SUCCESS, payload: response })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.FETCH_CART_FAILED, payload: MESSAGES.FETCH_CART_FAILED })
    }
  }, [])

  const addToCart = useCallback(async (cartItem: CartItem) => {
    dispatch({ type: ACTION_TYPES.ADD_TO_CART_PENDING })
    try {
      const newCartItem = await addToCartService(cartItem)
      dispatch({ type: ACTION_TYPES.ADD_TO_CART_SUCCESS, payload: newCartItem })
    } catch (error) {
      dispatch({ type: ACTION_TYPES.ADD_TO_CART_FAILED, payload: MESSAGES.ADD_TO_CART_FAILED })
    }
  }, [])

  const increaseQuantity = useCallback((cartId: number) => {
    dispatch({ type: ACTION_TYPES.INCREASE_QUANTITY_IN_CART, payload: cartId })
  }, [])

  const decreaseQuantity = useCallback((cartId: number) => {
    dispatch({ type: ACTION_TYPES.DECREASE_QUANTITY_IN_CART, payload: cartId })
  }, [])

  const changeQuantity = useCallback((cartItemId: number, quantity: number) => {
    dispatch({ type: ACTION_TYPES.CHANGE_QUANTITY_IN_CART, payload: { cartItemId, quantity } })
  }, [])

  const removeFromCart = useCallback(async (cartId: number) => {
    dispatch({ type: ACTION_TYPES.REMOVE_FROM_CART_PENDING })

    try {
      await removeFromCartService(cartId)
      dispatch({
        type: ACTION_TYPES.REMOVE_FROM_CART_SUCCESS,
        payload: cartId
      })
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.REMOVE_FROM_CART_FAILED,
        payload: MESSAGES.REMOVE_FROM_CART_FAILED
      })
    }
  }, [])

  const cartContextValue: ICartContextType = useMemo(
    () => ({
      state,
      dispatch,
      fetchCart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      changeQuantity,
      removeFromCart
    }),
    [state, fetchCart, addToCart, increaseQuantity, decreaseQuantity, changeQuantity, removeFromCart]
  )

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}

export default CartProvider
