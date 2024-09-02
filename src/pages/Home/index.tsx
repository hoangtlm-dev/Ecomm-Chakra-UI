import { useEffect, useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import {
  Center,
  Container,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  useToast
} from '@chakra-ui/react'

// Constants
import { banner, MESSAGES, PAGINATION, ROUTES } from '@app/constants'

// Types
import { Product } from '@app/types'

// Components
import {
  ActionBar,
  Banner,
  FilterCategories,
  FilterColors,
  FilterPrices,
  Pagination,
  ProductList
} from '@app/components'

// Hooks
import { useCartContext, useCategoryContext, useProductContext, useQueryParams } from '@app/hooks'

// Utils
import { convertColorParamsToCamelCase, getIdFromSlug } from '@app/utils'

const Home = () => {
  const filteredColors = [
    'filterBlue.500',
    'filterRed.500',
    'filterBlack.500',
    'filterYellow.500',
    'filterPink.500',
    'filterBlurPink.500'
  ]
  const [priceRange, setPriceRange] = useState([0, 1000])
  const { state: productState, fetchProducts, setListType } = useProductContext()
  const { state: categoryState, fetchCategories } = useCategoryContext()
  const { state: cartState, fetchCart, addToCart } = useCartContext()
  const { productList, isProductListLoading, listType } = productState
  const { categoryList } = categoryState
  const { cartList, isAddToCartLoading } = cartState

  const navigate = useNavigate()
  const toast = useToast()
  const { isOpen: isOpenLoadingModal, onOpen: onOpenLoadingModal, onClose: onCloseLoadingModal } = useDisclosure()

  const queryParams = useQueryParams()

  // Get current params from query params
  const currentCategoryId = queryParams.brand ? Number(getIdFromSlug(queryParams.brand)) : 0
  const currentPage = queryParams.page ? Number(queryParams.page) : 1

  useEffect(() => {
    fetchProducts({
      categoryId: currentCategoryId,
      page: currentPage,
      _sort: queryParams.sort,
      limit: queryParams.limit ? Number(queryParams.limit) : PAGINATION.DEFAULT_ITEMS_PER_PAGE,
      price_gte: Number(queryParams.min_price),
      price_lte: Number(queryParams.max_price),
      colors_like: queryParams.color && convertColorParamsToCamelCase(queryParams.color)
    })
  }, [
    fetchProducts,
    currentCategoryId,
    currentPage,
    queryParams.sort,
    queryParams.limit,
    queryParams.min_price,
    queryParams.max_price,
    queryParams.color
  ])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handleListTypeChange = (type: 'grid' | 'list') => {
    setListType(type)
  }

  const handleFilterByPrices = async (priceRange: number[]) => {
    setPriceRange(priceRange)
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        min_price: priceRange[0].toString(),
        max_price: priceRange[1].toString()
      }).toString()
    })
  }

  const handleSortByField = async (fieldName: string) => {
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        sort: fieldName.toLowerCase()
      }).toString()
    })
  }

  const handleShowListByItemsPerPage = async (itemsPerPage: number) => {
    navigate({
      pathname: ROUTES.ROOT,
      search: createSearchParams({
        ...queryParams,
        limit: itemsPerPage.toString()
      }).toString()
    })
  }

  useEffect(() => {
    if (isAddToCartLoading) {
      onOpenLoadingModal()
    }
  }, [isAddToCartLoading, onOpenLoadingModal])

  const handleAddProductToCart = async (product: Product) => {
    const { id, name, price, currencyUnit, quantity, discount, image } = product

    const cartItemFound = cartList.data.find((cartItem) => cartItem.productId === id)

    try {
      await addToCart({
        id: cartItemFound ? cartItemFound.id : 0,
        productId: id,
        productName: name,
        productPrice: price,
        productCurrencyUnit: currencyUnit,
        productQuantity: quantity,
        productDiscount: discount,
        productImage: image,
        quantity: cartItemFound ? cartItemFound.quantity + 1 : 1
      })

      toast({
        title: 'Success',
        description: MESSAGES.ADD_PRODUCT_SUCCESS,
        status: 'success'
      })
    } catch (error) {
      toast({
        title: 'Failed',
        description: String(error),
        status: 'error'
      })
    }

    onCloseLoadingModal()
  }

  return (
    <Container>
      <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
        <Stack gap={8}>
          <FilterCategories categories={categoryList.data} />
          <FilterPrices
            minPrice={queryParams.min_price ? Number(queryParams.min_price) : priceRange[0]}
            maxPrice={queryParams.max_price ? Number(queryParams.max_price) : priceRange[1]}
            onFilterByPrices={handleFilterByPrices}
          />
          <FilterColors colors={filteredColors} />
        </Stack>
        <Stack gap={8} flex={1}>
          <Banner
            background="backgroundPrimary"
            image={banner}
            heading="Adidas Men Running Sneakers"
            description="Performance and design. Taken right to the edge."
          />
          <ActionBar
            totalItems={productList.totalItems}
            sortOptions={['Id', 'Name', 'Price']}
            showOptions={[6, 9, 12]}
            listType={listType}
            onListTypeChange={handleListTypeChange}
            onSortByField={handleSortByField}
            onShowListByItemsPerPage={handleShowListByItemsPerPage}
          />

          <ProductList
            isLoading={isProductListLoading}
            products={productList.data}
            listType={listType}
            onAddToCart={handleAddProductToCart}
          />
          <Pagination
            totalItems={productList.totalItems}
            itemsPerPage={productList.limit || PAGINATION.DEFAULT_ITEMS_PER_PAGE}
            currentPage={productList.page}
          />
        </Stack>
      </Flex>

      {/* Modal for loading indicator */}
      <Modal
        isCentered
        isOpen={isOpenLoadingModal}
        onClose={onCloseLoadingModal}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="transparent" boxShadow="none">
          <Center>
            <Spinner size="lg" speed="0.8s" color="brand.600" />
          </Center>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default Home
