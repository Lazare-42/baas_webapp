import { HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { BillIcon } from '~/assets/icons'

const meta = {
    title: 'Theme/Components/IconButton',
    component: IconButton,
    parameters: {
        docs: {
            description: {
                component:
                    'Button with icon supporting different sizes and variants.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['filled', 'ghost', 'borderless'],
            control: { type: 'select' },
        },
        size: {
            options: ['xxs', 'xs', 'sm', 'md', 'lg'],
            control: { type: 'select' },
        },
    },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        'aria-label': 'Add item',
        icon: <BillIcon />,
        variant: 'filled',
        size: 'md',
    },
}

export const AllVariants: Story = {
    args: {
        'aria-label': 'Add item',
        icon: <BillIcon />,
    },
    render: () => (
        <VStack align="start" spacing={8}>
            <VStack align="start" spacing={4}>
                <Text fontWeight="bold">Variants:</Text>
                <HStack spacing={4}>
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        variant="filled"
                    />
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        variant="ghost"
                    />
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        variant="borderless"
                    />
                </HStack>
            </VStack>

            <VStack align="start" spacing={4}>
                <Text fontWeight="bold">Sizes:</Text>
                <HStack spacing={4} align="center">
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        size="xxs"
                    />
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        size="xs"
                    />
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        size="sm"
                    />
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        size="md"
                    />
                    <IconButton
                        aria-label="Add item"
                        icon={<BillIcon />}
                        size="lg"
                    />
                </HStack>
            </VStack>
        </VStack>
    ),
}

// Story for states
export const States: Story = {
    args: {
        'aria-label': 'Add item',
        icon: <BillIcon />,
    },
    render: () => (
        <HStack spacing={4}>
            <IconButton aria-label="Normal" icon={<BillIcon />} />
            <IconButton aria-label="Disabled" icon={<BillIcon />} isDisabled />
            <IconButton aria-label="Loading" icon={<BillIcon />} isLoading />
        </HStack>
    ),
}
