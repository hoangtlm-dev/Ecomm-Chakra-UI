// Constants
import { API_PATHS, PAGINATION } from '@app/constants'

// Types
import { Category, ExtendedQueryParams, PaginationRequest, PaginationResponse } from '@app/types'

// Utils
import { getEnvValue, httpRequest, updateQueryParams } from '@app/utils'

// Api urls
const categoryApiUrl = `${getEnvValue('VITE_BASE_API_URL')}/${API_PATHS.CATEGORIES}`
const paginationApiUrl = getEnvValue('VITE_PAGINATION_API_URL')

export const getCategoriesService = async (
  queryParams: ExtendedQueryParams<Partial<Category>>
): Promise<PaginationResponse<Category>> => {
  const queryString = updateQueryParams(queryParams)

  const requestData: PaginationRequest = {
    publicDataUrl: `${categoryApiUrl}?${queryString}`,
    page: queryParams.page ?? 1,
    limit: queryParams.limit ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  return await httpRequest<PaginationRequest, PaginationResponse<Category>>(paginationApiUrl, 'POST', requestData)
}
