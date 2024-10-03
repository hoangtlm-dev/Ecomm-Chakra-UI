import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'

// Constants
import { PAGINATION, QUERY_KEYS } from '@app/constants'

// Types
import { CartItem, ExtendedQueryParams, PaginationResponse } from '@app/types'

// Services
import { updateItemInCartService } from '@app/services'

export const useUpdateItemInCart = () => {
  const queryClient = useQueryClient()

  const defaultParams: Partial<ExtendedQueryParams<CartItem>> = {
    page: 1,
    _sort: 'id',
    _order: 'desc',
    limit: PAGINATION.DEFAULT_ITEMS_PER_PAGE
  }

  const { isPending, mutateAsync } = useMutation({
    mutationFn: ({ cartItemId, cartItemData }: { cartItemId: number; cartItemData: CartItem }) =>
      updateItemInCartService(cartItemId, cartItemData),
    onSuccess: (newCartItem: CartItem) => {
      queryClient.setQueryData(
        [QUERY_KEYS.CART, { ...defaultParams }],
        (oldData: InfiniteData<PaginationResponse<CartItem>>) => {
          if (!oldData) return oldData

          const updatedPages = oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((cartItem) => (cartItem.id === newCartItem.id ? newCartItem : cartItem))
          }))

          return {
            ...oldData,
            pages: updatedPages
          }
        }
      )
    }
  })

  return {
    isUpdateItemInCartLoading: isPending,
    updateItemInCart: mutateAsync
  }
}
