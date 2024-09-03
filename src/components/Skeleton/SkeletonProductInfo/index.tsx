import { Flex, Skeleton, SkeletonText, Stack, StackDivider } from '@chakra-ui/react'

const SkeletonProductInfo = () => {
  return (
    <Stack spacing={16}>
      {/* Product Info */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        <Skeleton
          w={{ base: 'full', lg: '400px' }}
          h={{ base: '270px', sm: '360px', lg: '400px' }}
          alignSelf={{ base: 'center', lg: 'flex-start' }}
        />
        <Stack flex={1} spacing={4} divider={<StackDivider w="full" borderColor="backgroundBlurGray" />}>
          {Array.from({ length: 2 }).map((_, index) => (
            <Stack key={index} spacing={4} w="full">
              <Skeleton w="full" height={8} />
              <SkeletonText noOfLines={index === 0 ? 1 : 3} spacing={index === 1 ? 4 : 0} skeletonHeight={6} w="80%" />
            </Stack>
          ))}
          <Flex gap={4} maxW={{ md: '500px' }} direction={{ base: 'column', sm: 'row' }} justifyContent="space-between">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} w={{ base: 'full', sm: '160px' }} height={10} />
            ))}
          </Flex>
          <Flex gap={4} direction={{ base: 'column', sm: 'row' }}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} minW="240px" height={10} />
            ))}
          </Flex>
        </Stack>
      </Flex>

      {/* Product Description */}
      <Stack p={8} spacing={4} bg="backgroundBlurGray" divider={<StackDivider w="full" borderColor="borderDarkGray" />}>
        <SkeletonText noOfLines={1} skeletonHeight={8} w={{ base: '50%', sm: '30%', lg: '20%' }} />
        <SkeletonText noOfLines={6} spacing={4} skeletonHeight={2} w="full" />
      </Stack>
    </Stack>
  )
}

export default SkeletonProductInfo
