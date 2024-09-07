import { useSearchParams } from 'react-router-dom'

/**
 * Custom hook that retrieves the current query parameters from the URL.
 *
 * @returns - An object where each key-value pair represents a query parameter and its value.
 *
 * This hook uses `useSearchParams` from `react-router-dom` to parse the current URL's search parameters
 * and returns them as an object.
 *
 * Example usage:
 * const queryParams = useQueryParams()
 * console.log(queryParams) // { param1: 'value1', param2: 'value2' }
 * ```
 *
 * @note If there are no query parameters in the URL, it will return an empty object.
 */
export const useQueryParams = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
