import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { CartItem } from '@app/components'

// Mocks
import { MOCK_CART_ITEM } from '@app/mocks'

const meta: Meta<typeof CartItem> = {
  title: 'Components/Cart/CartItem',
  component: CartItem,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof CartItem>

export const Default: Story = {
  args: {
    cartItem: MOCK_CART_ITEM
  }
}
