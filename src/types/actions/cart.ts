// Constants
import { ACTION_TYPES } from '@app/constants'

// Types
import { PaginationResponse, CartItem } from '@app/types'

export interface ICartState {
  // Cart
  isCartLoading: boolean
  cart: PaginationResponse<CartItem>
  cartError: string | null

  // Add to cart
  isAddToCartLoading: boolean
  addToCartError: string | null

  // Remove from cart
  isRemoveFromCartLoading: boolean
  removeFromCartError: string | null
}

// Pending actions
export type CartRequestPendingAction =
  | {
      type: ACTION_TYPES.ADD_TO_CART_PENDING
    }
  | {
      type: ACTION_TYPES.FETCH_CART_PENDING
    }
  | {
      type: ACTION_TYPES.REMOVE_FROM_CART_PENDING
    }

// Success actions
export type CartRequestSuccessAction =
  | {
      type: ACTION_TYPES.ADD_TO_CART_SUCCESS
      payload: CartItem
    }
  | {
      type: ACTION_TYPES.FETCH_CART_SUCCESS
      payload: PaginationResponse<CartItem>
    }
  | {
      type: ACTION_TYPES.INCREASE_QUANTITY_IN_CART
      payload: number
    }
  | {
      type: ACTION_TYPES.DECREASE_QUANTITY_IN_CART
      payload: number
    }
  | {
      type: ACTION_TYPES.CHANGE_QUANTITY_IN_CART
      payload: { cartItemId: number; quantity: number }
    }
  | {
      type: ACTION_TYPES.REMOVE_FROM_CART_SUCCESS
      payload: number
    }

// Failure actions
export type CartRequestFailureAction =
  | {
      type: ACTION_TYPES.ADD_TO_CART_FAILED
      payload: string
    }
  | {
      type: ACTION_TYPES.FETCH_CART_FAILED
      payload: string
    }
  | {
      type: ACTION_TYPES.REMOVE_FROM_CART_FAILED
      payload: string
    }

export type CartAction = CartRequestPendingAction | CartRequestSuccessAction | CartRequestFailureAction
