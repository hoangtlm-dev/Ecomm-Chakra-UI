// Constants
import { API_PATHS, PAGINATION } from '@app/constants'

// Types
import { ExtendedQueryParams, PaginationRequest, PaginationResponse, Product, ProductParams } from '@app/types'

// Utils
import { getEnvValue, httpRequest, updateQueryParams } from '@app/utils'

// Api urls
const productApiUrl = `${getEnvValue('VITE_BASE_API_URL')}/${API_PATHS.PRODUCTS}`
const paginationApiUrl = getEnvValue('VITE_PAGINATION_API_URL')

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

export const getCurrentProductServices = async (productId: number) =>
  await httpRequest<null, Product>(`${productApiUrl}/${productId}`, 'GET')
