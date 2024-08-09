// Types
import { Product } from '@app/types'
import {
  Box,
  Button,
  Center,
  Flex,
  forwardRef,
  Heading,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import ProductRating from '../ProductRating'
import { CartButtonIcon, FacebookIcon, TwitterIcon } from '@app/components/icons'
import QuantityInput from '@app/components/QuantityInput'

interface IProductInfo {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductInfo = forwardRef<IProductInfo, 'div'>(({ product, onAddToCart }: IProductInfo, ref) => {
  const { name, description, image, price, unitPrice, quantity, discount, reviewNumber, ratingStar, categoryName } =
    product

  return (
    <Stack spacing={16}>
      {/* Product Info */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        <Box
          w={{ base: 'full', lg: '400px' }}
          h={{ base: '270px', sm: '360px', lg: '400px' }}
          bg="backgroundBlurGray"
          alignSelf={{ base: 'center', lg: 'flex-start' }}
        >
          <Center h="full">
            <Image boxSize="full" objectFit="cover" src={image} alt={name} />
          </Center>
        </Box>
        <Stack flex={1} spacing={4} divider={<StackDivider w="full" borderColor="backgroundBlurGray" />}>
          <Heading fontSize="textLarge" fontWeight="medium">
            {name}
          </Heading>
          <HStack spacing={4}>
            <ProductRating ratingNumber={ratingStar} />
            <Text fontSize="textTiny" color="textGray">
              {reviewNumber} reviews
            </Text>
            <Button variant="ghost" fontSize="textTiny" color="textBlue" h="unset" p={0}>
              Submit a review
            </Button>
          </HStack>
          <Stack>
            <HStack spacing={4}>
              <Text fontSize="textMedium" fontWeight="bold" color="textBlue">
                {unitPrice}
                {parseFloat((price - (price * discount) / 100).toFixed(2))}
              </Text>
              {discount && (
                <>
                  <Text fontSize="textSmall" color="textGray" textDecoration="line-through">
                    {unitPrice}
                    {price}
                  </Text>
                  <Text fontSize="textSmall" fontWeight="bold" color="textLightRed">
                    {discount}% Off
                  </Text>
                </>
              )}
            </HStack>
            <HStack>
              <Text fontSize="textSmall" minW="140px">
                Availability:
              </Text>
              <Text fontSize="textSmall">{quantity > 0 ? 'In stock' : 'Sold out'}</Text>
            </HStack>
            <HStack>
              <Text fontSize="textSmall" minW="140px">
                Category:
              </Text>
              <Text fontSize="textSmall">{categoryName}</Text>
            </HStack>
            <HStack>
              <Text fontSize="textSmall">Free shipping</Text>
            </HStack>
          </Stack>
          <Flex
            gap={4}
            w="full"
            maxW={{ md: '500px' }}
            direction={{ base: 'column', sm: 'row' }}
            justifyContent="space-between"
          >
            <QuantityInput ref={ref} />
            <Button h={14} gap={4} bg="brand.50" _hover={{ opacity: 0.6 }} onClick={() => onAddToCart(product)}>
              <CartButtonIcon color="textBlue" />
              <Text color="textBlue">Add to Cart</Text>
            </Button>
          </Flex>
          <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
            <Button gap={4} minW="240px" bg="facebook" _hover={{ opacity: 0.8 }}>
              <FacebookIcon color="white" />
              <Text color="textWhite" fontSize="textSmall" fontWeight="medium">
                Share on Facebook
              </Text>
            </Button>
            <Button gap={4} minW="240px" bg="twitter" _hover={{ opacity: 0.8 }}>
              <TwitterIcon color="white" />
              <Text color="textWhite" fontSize="textSmall" fontWeight="medium">
                Share on Twitter
              </Text>
            </Button>
          </Flex>
        </Stack>
      </Flex>

      {/* Product Description */}
      <Stack p={8} spacing={4} bg="backgroundBlurGray" divider={<StackDivider w="full" borderColor="borderDarkGray" />}>
        <Heading as="h4" fontSize="textMedium" fontWeight="normal" color="lightBlue">
          Product Information
        </Heading>
        <Text fontSize="textTiny" color="textGray">
          {description}
        </Text>
      </Stack>
    </Stack>
  )
})

export default ProductInfo
