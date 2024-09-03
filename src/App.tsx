import { ChakraProvider, Container, Heading, VStack, Text, Link } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes, Link as ReactRouterLink } from 'react-router-dom'

// Constants
import { ROUTES } from '@app/constants'

// Themes
import { theme } from '@app/themes'

// Context
import { AppProviders } from '@app/contexts'

/// Layout
import { MainLayout } from '@app/layouts'

// Pages
import { Cart, Home, ProductDetails } from '@app/pages'

const PlaceholderPage = ({ pageName = 'Placeholder' }: { pageName?: string }) => (
  <Container>
    <VStack>
      <Heading>{pageName}</Heading>
      <Text mt="2">🔥 The {pageName} page! Coming soon!</Text>
      <Link as={ReactRouterLink} to={ROUTES.ROOT} color="textBlue" fontSize="textMedium">
        Back to Home
      </Link>
    </VStack>
  </Container>
)

const App = () => {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { position: 'bottom-right', isClosable: true, duration: 3000 } }}
    >
      <AppProviders>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={ROUTES.ROOT} element={<Home />} />
              <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
              <Route path={ROUTES.CART} element={<Cart />} />
              <Route path={ROUTES.NOT_FOUND} element={<PlaceholderPage pageName="Not found" />} />

              {/* Menus */}
              <Route path={ROUTES.BAGS} element={<PlaceholderPage pageName="Bags" />} />
              <Route path={ROUTES.SNEAKERS} element={<PlaceholderPage pageName="Sneakers" />} />
              <Route path={ROUTES.BELT} element={<PlaceholderPage pageName="Belt" />} />
              <Route path={ROUTES.CONTACT} element={<PlaceholderPage pageName="Contact" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProviders>
    </ChakraProvider>
  )
}

export default App
