// Constants
import { ACTION_TYPES } from '@app/constants'

// Types
import { PaginationResponse, Product } from '@app/types'

export interface IProductState {
  // Product list
  productList: PaginationResponse<Product>
  isProductListLoading: boolean
  productListError: string | null

  // Product details
  isCurrentProductLoading: boolean
  currentProduct: Product
  currentProductError: string | null

  // Add listType
  listType: 'grid' | 'list'
}

// Pending actions
type ProductRequestPendingAction =
  | {
      type: ACTION_TYPES.FETCH_PRODUCTS_PENDING
    }
  | {
      type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_PENDING
    }

// Success actions
type ProductRequestSuccessAction =
  | {
      type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS
      payload: PaginationResponse<Product>
    }
  | {
      type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS
      payload: Product
    }

// Failure actions
type ProductRequestFailureAction =
  | {
      type: ACTION_TYPES.FETCH_PRODUCTS_ERROR
      payload: string
    }
  | {
      type: ACTION_TYPES.FETCH_PRODUCT_DETAILS_ERROR
      payload: string
    }

// List Type
type ListTypeChangeAction = {
  type: ACTION_TYPES.SET_LIST_TYPE
  payload: 'grid' | 'list'
}

export type ProductAction =
  | ProductRequestPendingAction
  | ProductRequestSuccessAction
  | ProductRequestFailureAction
  | ListTypeChangeAction
