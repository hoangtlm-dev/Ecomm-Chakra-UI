import { useContext } from 'react'

// Constants
import { MESSAGES } from '@app/constants'

// Context
import { CartContext } from '@app/contexts/CartContext'

export const useCartContext = () => {
  const cartContext = useContext(CartContext)

  if (!cartContext) {
    throw new Error(MESSAGES.CONTEXT_ERROR('Cart'))
  }

  return cartContext
}
