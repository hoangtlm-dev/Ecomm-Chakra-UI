import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { CartList } from '@app/components'

// Mocks
import { MOCK_CARTS } from '@app/mocks'

const meta: Meta<typeof CartList> = {
  title: 'Components/Cart/CartList',
  component: CartList,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof CartList>

export const Default: Story = {
  args: {
    cart: MOCK_CARTS()
  }
}
