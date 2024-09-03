import { Box, Center, Divider, Grid } from '@chakra-ui/react'

// Constants
import { PAGINATION } from '@app/constants'

// Types
import { Product } from '@app/types'

// Components
import { SkeletonProductItem, ProductItem, ProductListEmpty } from '@app/components'

interface IProductListProps {
  isLoading: boolean
  products: Product[]
  listType?: 'grid' | 'list'
  gridTemplateColumns?: { [key: string]: string }
  skeletonTemplateColumns?: number
  onAddToCart: (product: Product) => void
}

const ProductList = ({
  isLoading,
  products,
  listType = 'grid',
  gridTemplateColumns,
  skeletonTemplateColumns = PAGINATION.DEFAULT_ITEMS_PER_PAGE,
  onAddToCart
}: IProductListProps) => {
  const defaultGridTemplateColumns =
    listType === 'grid'
      ? {
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)'
        }
      : 'repeat(1, 1fr)'

  if (isLoading) {
    return (
      <Grid
        as="ul"
        w="full"
        listStyleType="none"
        templateColumns={gridTemplateColumns || defaultGridTemplateColumns}
        gap={4}
      >
        {Array.from({ length: skeletonTemplateColumns }).map((_, index) => (
          <Box as="li" key={index}>
            <SkeletonProductItem listType={listType} />
            {listType === 'list' && index < skeletonTemplateColumns - 1 && <Divider orientation="horizontal" />}
          </Box>
        ))}
      </Grid>
    )
  }

  if (!isLoading && !products.length) {
    return (
      <Center>
        <ProductListEmpty />
      </Center>
    )
  }

  return (
    <Grid
      as="ul"
      w="full"
      listStyleType="none"
      templateColumns={gridTemplateColumns || defaultGridTemplateColumns}
      gap={4}
    >
      {products.map((product, index) => (
        <Box as="li" key={product.id}>
          <ProductItem product={product} listType={listType} onAddToCart={onAddToCart} />
          {listType === 'list' && index < products.length - 1 && <Divider orientation="horizontal" />}
        </Box>
      ))}
    </Grid>
  )
}

export default ProductList
