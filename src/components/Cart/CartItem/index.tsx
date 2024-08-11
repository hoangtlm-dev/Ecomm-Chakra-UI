import { Box, Flex, Heading, HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react'

// Types
import { Cart } from '@app/types'

// Components
import { CloseIcon, QuantityController } from '@app/components'

// Utils
import { calculateProductPrice } from '@app/utils'

interface ICartItemProps {
  cart: Cart
  onRemoveItemFromCart: (cartId: number) => void
  onIncreaseQuantity: (cartId: number) => void
  onDecreaseQuantity: (cartId: number) => void
  onChangeQuantity: (cartId: number, value: number) => void
}

const CartItem = ({
  cart,
  onRemoveItemFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onChangeQuantity
}: ICartItemProps) => {
  const { id, productName, productImage, productPrice, productQuantity, productUnitPrice, productDiscount, quantity } =
    cart

  return (
    <Flex gap={4} display={{ base: 'flex', lg: 'none' }}>
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
            minW="unset"
            aria-label="close"
            backgroundColor="backgroundBlurGray"
            icon={<CloseIcon boxSize={2} color="textLightRed" />}
            _hover={{ opacity: 0.6 }}
            onClick={() => onRemoveItemFromCart(id)}
          />
        </Flex>
        <HStack gap={{ base: 2, sm: 4, md: 8 }}>
          <Text fontSize="textSmall">
            {productUnitPrice}
            {calculateProductPrice(productPrice, productDiscount)}
          </Text>
          <QuantityController
            size="xs"
            maxQuantity={productQuantity}
            currentQuantity={quantity}
            onIncreaseQuantity={() => onIncreaseQuantity(id)}
            onChangeQuantity={(value) => onChangeQuantity(id, Number(value))}
            onDecreaseQuantity={() => onDecreaseQuantity(id)}
          />
          <Text fontSize="textSmall">
            {productUnitPrice}
            {calculateProductPrice(productPrice, productDiscount, quantity)}
          </Text>
        </HStack>
      </Stack>
    </Flex>
  )
}

export default CartItem
