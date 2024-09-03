import { Meta, StoryObj } from '@storybook/react'

// Components
import { SkeletonProductItem } from '@app/components'

const meta: Meta<typeof SkeletonProductItem> = {
  title: 'Components/Product/SkeletonProductItem',
  component: SkeletonProductItem,
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
