import { Container } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

// Components
import { SkeletonCartItem } from '@app/components'

const meta: Meta<typeof SkeletonCartItem> = {
  title: 'Components/Skeleton/SkeletonCartItem',
  component: SkeletonCartItem,
  decorators: [
    (Story) => (
      <Container maxW="720px">
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof SkeletonCartItem>

export const Default: Story = {}
