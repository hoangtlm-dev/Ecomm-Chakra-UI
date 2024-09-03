import { Center } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

// Components
import { SkeletonProductItem } from '@app/components'

const meta: Meta<typeof SkeletonProductItem> = {
  title: 'Components/Skeleton/SkeletonProductItem',
  component: SkeletonProductItem,
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    )
  ],
  argTypes: {
    listType: {
      control: 'radio'
    }
  }
}

export default meta

type Story = StoryObj<typeof SkeletonProductItem>

export const Grid: Story = {
  args: {
    listType: 'grid'
  }
}

export const List: Story = {
  args: {
    listType: 'list'
  }
}
