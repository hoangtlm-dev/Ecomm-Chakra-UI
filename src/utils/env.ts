// Constants
import { ENV, MESSAGES } from '@app/constants'

// Types
import { EnvKey } from '@app/types'

/**
 * Retrieves the value of an environment variable.
 *
 * This function attempts to fetch the value of the specified environment variable key from the `ENV.VAR` object. If the value is not found, it returns the provided default value. If the default value is not provided and the value is still undefined, it throws an error.
 *
 * @param key - The key of the environment variable to retrieve.
 * @returns - The value of the environment variable.
 * @throws - Throws an error if the environment variable is not found and no default value is provided.
 */
export const getEnvValue = (key: EnvKey): string => {
  const value = ENV[key]

  if (value === undefined) {
    throw new Error(MESSAGES.MISSING_ENV(key))
  }

  return value
}
