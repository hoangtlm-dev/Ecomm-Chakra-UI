import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { SkeletonCartItem } from '@app/components'

const meta: Meta<typeof SkeletonCartItem> = {
  title: 'Components/Cart/SkeletonCartItem',
  component: SkeletonCartItem,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof SkeletonCartItem>

export const Default: Story = {}
