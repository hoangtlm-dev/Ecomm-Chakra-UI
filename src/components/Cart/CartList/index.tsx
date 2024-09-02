import { Fragment } from 'react'
import {
  Box,
  Divider,
  Heading,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { CartItem as CartItemType } from '@app/types'

// Components
import { CloseIcon, ProductListEmpty, SkeletonCartItem, CartItem, QuantityController } from '@app/components'

// Utils
import { calculateProductPrice } from '@app/utils'

interface ICartListProps {
  isLoading: boolean
  cart: CartItemType[]
  onRemoveItemFromCart: (cartId: number) => void
  onIncreaseQuantity: (cartId: number) => void
  onDecreaseQuantity: (cartId: number) => void
  onChangeQuantity: (cartId: number, value: number) => void
}

const CartList = ({
  isLoading,
  cart,
  onRemoveItemFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onChangeQuantity
}: ICartListProps) => {
  const tableHeadings = ['', 'Product', 'Unit Price', 'Qty', 'Price']

  const renderCartContent = () => {
    if (isLoading) {
      return Array.from({ length: PAGINATION.DEFAULT_ITEMS_PER_PAGE }).map((_, index) => (
        <Fragment key={index}>
          <SkeletonCartItem />
          {index < PAGINATION.DEFAULT_ITEMS_PER_PAGE - 1 && <Divider orientation="horizontal" />}
        </Fragment>
      ))
    }

    if (!isLoading && !cart.length) {
      return <ProductListEmpty />
    }

    return cart.map((cartItem, index) => (
      <Fragment key={cartItem.id}>
        <CartItem
          cart={cartItem}
          onRemoveItemFromCart={onRemoveItemFromCart}
          onIncreaseQuantity={() => onIncreaseQuantity(cartItem.id)}
          onChangeQuantity={(value) => onChangeQuantity(cartItem.id, Number(value))}
          onDecreaseQuantity={() => onDecreaseQuantity(cartItem.id)}
        />
        {index < cart.length - 1 && <Divider orientation="horizontal" />}
      </Fragment>
    ))
  }

  return (
    <>
      {/* Cart for Mobile & Tablet screen */}
      <Stack display={{ base: 'flex', lg: 'none' }} gap={8}>
        {renderCartContent()}
      </Stack>

      {/* Table for Desktop screen */}
      <TableContainer display={{ base: 'none', lg: 'block' }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableHeadings.map((heading) => (
                <Th key={heading}>{heading}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {/* Skeleton loading for table */}
            {isLoading && (
              <>
                {Array.from({ length: PAGINATION.DEFAULT_ITEMS_PER_PAGE }).map((_, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton boxSize={4} />
                    </Td>
                    <Td>
                      <HStack gap={8}>
                        <Skeleton boxSize="80px" />
                        <Skeleton w="200px" h={6} />
                      </HStack>
                    </Td>
                    <Td>
                      <Skeleton w="120px" h={6} />
                    </Td>
                    <Td>
                      <Skeleton w="120px" h={6} />
                    </Td>
                    <Td>
                      <Skeleton w="120px" h={6} />
                    </Td>
                  </Tr>
                ))}
              </>
            )}
            {!isLoading && !cart.length && (
              <Tr>
                <Td colSpan={5}>
                  <ProductListEmpty />
                </Td>
              </Tr>
            )}
            {!isLoading &&
              cart.length > 0 &&
              cart.map((cart) => {
                const {
                  id,
                  productName,
                  productImage,
                  productPrice,
                  productCurrencyUnit,
                  productQuantity,
                  productDiscount,
                  quantity
                } = cart

                return (
                  <Tr key={id}>
                    <Td>
                      <IconButton
                        boxSize={4}
                        minW="unset"
                        aria-label="close"
                        backgroundColor="backgroundBlurGray"
                        icon={<CloseIcon boxSize={2} color="textLightRed" />}
                        _hover={{ opacity: 0.6 }}
                        onClick={() => onRemoveItemFromCart(id)}
                      />
                    </Td>
                    <Td>
                      <HStack>
                        <Box boxSize="80px">
                          <Image src={productImage} boxSize="full" objectFit="cover" />
                        </Box>
                        <Heading as="h3" fontSize="textSmall" noOfLines={1}>
                          {productName}
                        </Heading>
                      </HStack>
                    </Td>
                    <Td>
                      <Text>
                        {productCurrencyUnit}
                        {calculateProductPrice(productPrice, productDiscount)}
                      </Text>
                    </Td>
                    <Td>
                      <QuantityController
                        maxQuantity={productQuantity}
                        currentQuantity={quantity}
                        onIncreaseQuantity={() => onIncreaseQuantity(id)}
                        onChangeQuantity={(value) => onChangeQuantity(id, Number(value))}
                        onDecreaseQuantity={() => onDecreaseQuantity(id)}
                        size="md"
                      />
                    </Td>
                    <Td>
                      <Text>
                        {productCurrencyUnit}
                        {calculateProductPrice(productPrice, productDiscount, quantity)}
                      </Text>
                    </Td>
                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CartList
