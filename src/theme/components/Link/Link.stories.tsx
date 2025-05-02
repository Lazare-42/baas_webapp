import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Link',
    component: Link,
    parameters: {
        docs: {
            description: {
                component: 'Link component with underlined base style.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof Link>

// Default story
export const Default: Story = {
    args: {
        children: 'Click me',
        href: '#',
    },
}

// Different states
export const States: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={4}>
            <HStack spacing={4}>
                <Text fontWeight="bold">Normal:</Text>
                <Link href="#">Normal Link</Link>
            </HStack>

            <HStack spacing={4}>
                <Text fontWeight="bold">Hover:</Text>
                <Link href="#">Hover me</Link>
            </HStack>

            <HStack spacing={4}>
                <Text fontWeight="bold">External:</Text>
                <Link href="https://example.com" isExternal>
                    External Link
                </Link>
            </HStack>
        </VStack>
    ),
}
