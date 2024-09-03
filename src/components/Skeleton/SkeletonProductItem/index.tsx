import { Flex, Skeleton, SkeletonText, Stack, StackDivider, VStack } from '@chakra-ui/react'

interface ISkeletonProductItemProps {
  listType: 'grid' | 'list'
}

const SkeletonProductItem = ({ listType }: ISkeletonProductItemProps) => {
  return listType === 'grid' ? (
    <VStack h="390px" pb={4} gap={4} borderWidth="3px" borderColor="backgroundBlurGray">
      <Skeleton w="full" h="full" />
      <VStack px={4} gap={4}>
        <SkeletonText w="220px" noOfLines={1} skeletonHeight={4} />
        <SkeletonText w="120px" noOfLines={1} skeletonHeight={4} />
        <SkeletonText w="220px" noOfLines={1} skeletonHeight={4} />
      </VStack>
    </VStack>
  ) : (
    <Flex w="full" h="270px" gap={4} pb={4}>
      <Skeleton w="270px" h="full" />
      <Stack flex={1} gap={4} divider={<StackDivider w="80%" borderColor="backgroundBlurGray" />}>
        <Stack gap={4}>
          <SkeletonText w="270px" noOfLines={1} skeletonHeight={8} />
          <SkeletonText w="270px" noOfLines={1} skeletonHeight={4} />
        </Stack>
        <Stack gap={4} w="full">
          <SkeletonText w="240px" noOfLines={1} skeletonHeight={6} />
          <SkeletonText w="full" noOfLines={3} skeletonHeight={2} />
          <Skeleton w="150px" h="48px" />
        </Stack>
      </Stack>
    </Flex>
  )
}

export default SkeletonProductItem
