import { Meta, StoryObj } from '@storybook/react'
import { Container } from '@chakra-ui/react'

// Components
import { SkeletonProductInfo } from '@app/components'

const meta: Meta<typeof SkeletonProductInfo> = {
  title: 'Components/Product/SkeletonProductInfo',
  component: SkeletonProductInfo,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    )
  ]
}

export default meta

type Story = StoryObj<typeof SkeletonProductInfo>

export const Default: Story = {}
