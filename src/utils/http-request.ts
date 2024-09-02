// Constants
import { MESSAGES } from '@app/constants'

// Types
import { RequestOptions } from '@app/types'

/**
 * Sends an HTTP request with the specified options and returns the response data.
 *
 * @param url - The URL to which the request is sent.
 * @param method - The HTTP method to be used for the request (e.g., 'GET', 'POST').
 * @param data - Optional data to be sent with the request. If the method is not 'GET' or 'DELETE', this data will be included in the request body.
 * @param customHeaders - Optional custom headers to be included in the request.
 * @returns - A promise that resolves to the response data of type U.
 * @throws - Throws an error if the response status is not OK.
 */
export const httpRequest = async <T, U>(
  url: string,
  method: string,
  data?: T,
  customHeaders?: Record<string, string>
): Promise<U> => {
  const headers = customHeaders ? { ...customHeaders } : {}

  const options: RequestOptions = {
    method: method,
    headers,
    body: null
  }

  // Check if the method is not 'GET' or 'DELETE' as these methods do not have a request body.
  if (method !== 'GET' && method !== 'DELETE') {
    // If the data is an instance of FormData, set it directly to the body.
    if (data instanceof FormData) {
      options.body = data
    } else {
      // Otherwise, set the content type to 'application/json' and stringify the data.
      options.headers['Content-Type'] = 'application/json'
      options.body = JSON.stringify(data)
    }
  }

  const response = await fetch(url, options)

  if (response.ok) {
    const responseData = await response.json()
    return responseData as U
  } else {
    const errorMessage = MESSAGES.ERROR_SENDING_REQUEST
    throw new Error(errorMessage)
  }
}
