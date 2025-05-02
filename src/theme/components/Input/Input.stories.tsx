import { Input, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                component: 'Input field with blackInput and filled variants.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['blackInput', 'filled'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
    render: () => (
        <VStack align="start" spacing={8}>
            <VStack align="start" spacing={2}>
                <Text fontWeight="bold">Black Input:</Text>
                <Input variant="blackInput" placeholder="Enter text..." />
            </VStack>

            <VStack align="start" spacing={2}>
                <Text fontWeight="bold">Filled Input:</Text>
                <Input variant="filled" placeholder="Enter text..." />
            </VStack>
        </VStack>
    ),
}

export const States: Story = {
    render: () => (
        <VStack align="start" spacing={4}>
            <Input variant="blackInput" placeholder="Normal" />
            <Input variant="blackInput" placeholder="Disabled" isDisabled />
            <Input variant="blackInput" placeholder="Invalid" isInvalid />
            <Input variant="blackInput" placeholder="Read only" isReadOnly />
        </VStack>
    ),
}
