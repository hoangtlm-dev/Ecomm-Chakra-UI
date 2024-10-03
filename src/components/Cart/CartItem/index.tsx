import { Box, Flex, Heading, HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react'

// Types
import { CartItem as CartItemType } from '@app/types'

// Components
import { CloseIcon, QuantityController } from '@app/components'

// Utils
import { calculateProductPrice } from '@app/utils'

interface ICartItemProps {
  cartItem: CartItemType
  isUpdatingQuantity: (cartId: number) => boolean
  onRemoveItemFromCart: (cartId: number) => void
  onUpdateQuantity: (cartId: number, action: 'increase' | 'decrease' | 'change', newQuantity?: number) => void
}

const CartItem = ({ cartItem, isUpdatingQuantity, onRemoveItemFromCart, onUpdateQuantity }: ICartItemProps) => {
  const {
    id,
    productName,
    productImage,
    productPrice,
    productQuantity,
    productCurrencyUnit,
    productDiscount,
    quantity
  } = cartItem

  return (
    <Flex gap={4}>
      <Box boxSize="80px">
        <Image src={productImage} boxSize="full" objectFit="cover" />
      </Box>
      <Stack flex={1} justifyContent="center">
        <Flex justifyContent="space-between" gap={4}>
          <Heading as="h3" fontSize="textSmall" noOfLines={1}>
            {productName}
          </Heading>
          <IconButton
            boxSize={4}
            minW={0}
            aria-label="close"
            backgroundColor="backgroundBlurGray"
            icon={<CloseIcon boxSize={2} color="textLightRed" />}
            _hover={{ opacity: 0.6 }}
            onClick={() => onRemoveItemFromCart(id)}
          />
        </Flex>
        <HStack gap={{ base: 2, sm: 4, md: 12 }}>
          <Text fontSize="textSmall">
            {productCurrencyUnit}
            {calculateProductPrice(productPrice, productDiscount)}
          </Text>
          <QuantityController
            size="xs"
            maxQuantity={productQuantity}
            currentQuantity={quantity}
            isDisabled={isUpdatingQuantity(id)}
            onDecreaseQuantity={() => onUpdateQuantity(id, 'decrease')}
            onChangeQuantity={(value) => onUpdateQuantity(id, 'change', Number(value))}
            onIncreaseQuantity={() => onUpdateQuantity(id, 'increase')}
          />
          <Text fontSize="textSmall">
            {productCurrencyUnit}
            {calculateProductPrice(productPrice, productDiscount, quantity)}
          </Text>
        </HStack>
      </Stack>
    </Flex>
  )
}

export default CartItem
