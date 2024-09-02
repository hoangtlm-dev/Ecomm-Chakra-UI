import { useContext } from 'react'

// Constants
import { MESSAGES } from '@app/constants'

// Context
import { ProductContext } from '@app/contexts/ProductContext'

export const useProductContext = () => {
  const productContext = useContext(ProductContext)

  if (!productContext) {
    throw new Error(MESSAGES.CONTEXT_ERROR('Product'))
  }

  return productContext
}
