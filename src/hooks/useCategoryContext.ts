import { useContext } from 'react'

// Constants
import { MESSAGES } from '@app/constants'

// Context
import { CategoryContext } from '@app/contexts/CategoryContext'

export const useCategoryContext = () => {
  const categoryContext = useContext(CategoryContext)

  if (!categoryContext) {
    throw new Error(MESSAGES.CONTEXT_ERROR('Category'))
  }

  return categoryContext
}
