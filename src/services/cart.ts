// Constants
import { API_PATHS, PAGINATION } from '@app/constants'

// Types
import { CartItem, ExtendedQueryParams, PaginationRequest, PaginationResponse } from '@app/types'

// Utils
import { getEnvValue, httpRequest, updateQueryParams } from '@app/utils'

// Api urls
const cartApiUrl = `${getEnvValue('VITE_BASE_API_URL')}/${API_PATHS.CART}`
const paginationApiUrl = getEnvValue('VITE_PAGINATION_API_URL')

/**
 * Adds a new cart item or updates an existing cart item in the backend.
 *
 * @param cartData - The cart object that needs to be added or updated.
 * If `cartData` has an `id`, it will be updated;
 * otherwise, a new cart item will be created.
 *
 * @returns - A promise that resolves to the cart object returned by the server
 * after the operation (either creation or update).
 */
export const addToCartService = async (cartData: CartItem): Promise<CartItem> => {
  if (!cartData.id) {
    return await httpRequest<Omit<CartItem, 'id'>, CartItem>(cartApiUrl, 'POST', cartData)
  }
  return await httpRequest<CartItem, CartItem>(`${cartApiUrl}/${cartData.id}`, 'PUT', cartData)
}

/**
 * Retrieves a paginated list of cart items based on the provided query parameters.
 *
 * @param queryParams - An object containing query parameters to filter the cart items.
 *
 * @returns - A promise that resolves to a paginated response containing an array of cart items and pagination metadata.
 *
 */
export const getCartService = async (
  queryParams: Partial<ExtendedQueryParams<CartItem>>
): Promise<PaginationResponse<CartItem>> => {
  const queryString = updateQueryParams(queryParams)

  const requestData: PaginationRequest = {
    publicDataUrl: `${cartApiUrl}?${queryString}`,
    page: queryParams.page ?? 1,
    limit: queryParams.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  return await httpRequest<PaginationRequest, PaginationResponse<CartItem>>(paginationApiUrl, 'POST', requestData)
}

/**
 * Removes a cart item from the backend.
 *
 * @param cartId - The ID of the cart item that needs to be removed.
 *
 * @returns - A promise that resolves when the cart item is successfully deleted.
 * The promise resolves to `void` since no data is expected to be returned by the server after the deletion.
 *
 */
export const removeFromCartService = async (cartId: number): Promise<void> =>
  await httpRequest(`${cartApiUrl}/${cartId}`, 'DELETE')
