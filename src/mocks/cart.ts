// Constants
import { mockProductImage, PAGINATION } from '@app/constants'

// Types
import { CartItem } from '@app/types'

export const MOCK_CART_ITEM: CartItem = {
  id: 0,
  productId: 1,
  productName: 'Nike Airmax 270 React',
  productPrice: 539.99,
  productCurrencyUnit: '$',
  productQuantity: 100,
  productDiscount: 20,
  productImage: mockProductImage,
  quantity: 2
}

export const MOCK_CART = (length?: number): CartItem[] =>
  Array.from({ length: length ?? PAGINATION.DEFAULT_ITEMS_PER_PAGE }, (_, index) => ({
    ...MOCK_CART_ITEM,
    id: index + 1
  }))
