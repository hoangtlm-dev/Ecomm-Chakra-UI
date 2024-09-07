// Constants
import { API_PATHS, PAGINATION } from '@app/constants'

// Types
import { ExtendedQueryParams, PaginationRequest, PaginationResponse, Product, ProductParams } from '@app/types'

// Utils
import { getEnvValue, httpRequest, updateQueryParams } from '@app/utils'

// Api urls
const productApiUrl = `${getEnvValue('VITE_BASE_API_URL')}/${API_PATHS.PRODUCTS}`
const paginationApiUrl = getEnvValue('VITE_PAGINATION_API_URL')

/**
 * Retrieves a paginated list of products based on the provided query parameters.
 *
 * @param queryParams - An object containing query parameters to filter the products.
 *
 * @returns - A promise that resolves to a paginated response containing an array of products and pagination metadata.
 *
 */
export const getProductsService = async (
  queryParams: Partial<ExtendedQueryParams<ProductParams>>
): Promise<PaginationResponse<Product>> => {
  const queryString = updateQueryParams(queryParams)

  const requestData: PaginationRequest = {
    publicDataUrl: `${productApiUrl}?${queryString}`,
    page: queryParams.page ?? 1,
    limit: queryParams.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  return await httpRequest<PaginationRequest, PaginationResponse<Product>>(paginationApiUrl, 'POST', requestData)
}

/**
 * Retrieves the details of a product by its unique identifier.
 *
 * @param productId - The unique identifier of the product to retrieve.
 *
 * @returns - A promise that resolves to the product details.
 *
 */
export const getCurrentProductService = async (productId: number) =>
  await httpRequest<null, Product>(`${productApiUrl}/${productId}`, 'GET')
