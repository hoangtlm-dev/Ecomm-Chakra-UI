import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Circle, Container, HStack, Link, Text } from '@chakra-ui/react'

// Constants
import { ROUTES } from '@app/constants'

// Components
import { CartHeaderIcon, UserIcon } from '@app/components'

// Hooks
import { useCartContext } from '@app/hooks'

const ActionHeader = () => {
  const { state: cartState, fetchCart } = useCartContext()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  return (
    <Box pt={8} pb={4} borderBottomWidth={2} borderColor="borderBlurGray">
      <Container>
        <HStack gap={4} justifyContent="flex-end">
          <Link as={NavLink} cursor="not-allowed">
            <HStack>
              <UserIcon boxSize={5} />
              <Text>My Profile</Text>
            </HStack>
          </Link>
          <Link as={NavLink} to={ROUTES.CART} position="relative">
            <CartHeaderIcon boxSize={6} />
            <Box>
              <Circle
                backgroundColor="backgroundBlurRed"
                color="textWhite"
                size={5}
                fontSize={10}
                fontWeight="bold"
                position="absolute"
                bottom="50%"
                left="50%"
                borderColor="white"
                borderWidth={2}
              >
                {cartState.cartList.totalItems}
              </Circle>
            </Box>
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

export default ActionHeader
