// Button.stories.tsx
import { Box, Button, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

// Template pour afficher tous les variants
const AllVariantsTemplate = () => {
    const variants = [
        'filled',
        'ghost',
        'borderless',
        'success',
        'error',
        'plan',
        'chartType',
    ] as const
    const sizes = ['sm', 'md', 'lg', 'xxl'] as const

    return (
        <VStack spacing={8} align="start">
            {/* Variants */}
            <Box>
                <h3>Variants</h3>
                <Wrap spacing={4} mt={4}>
                    {variants.map((variant) => (
                        <WrapItem key={variant}>
                            <Button variant={variant}>{variant}</Button>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>

            {/* Sizes */}
            <Box>
                <h3>Sizes</h3>
                <Wrap spacing={4} mt={4}>
                    {sizes.map((size) => (
                        <WrapItem key={size}>
                            <Button size={size}>{size}</Button>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>

            {/* States */}
            <Box>
                <h3>States</h3>
                <Wrap spacing={4} mt={4}>
                    <WrapItem>
                        <Button>Default</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button isDisabled>Disabled</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button isLoading>Loading</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button isActive>Active</Button>
                    </WrapItem>
                </Wrap>
            </Box>

            {/* Plan Variant Example */}
            <Box width="300px">
                <h3>Plan Variant Example</h3>
                <Button variant="plan" isActive>
                    Current Plan
                </Button>
            </Box>

            {/* Chart Type Variant Example */}
            <Box>
                <h3>Chart Type Variant Example</h3>
                <Wrap spacing={4} mt={4}>
                    <WrapItem>
                        <Button variant="chartType">Line</Button>
                    </WrapItem>
                    <WrapItem>
                        <Button variant="chartType" isActive>
                            Bar
                        </Button>
                    </WrapItem>
                </Wrap>
            </Box>
        </VStack>
    )
}

export const AllVariants: Story = {
    render: () => <AllVariantsTemplate />,
}

// Stories individuelles pour chaque variant
export const Filled: Story = {
    args: {
        variant: 'filled',
        children: 'Filled Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost Button',
    },
}

export const Borderless: Story = {
    args: {
        variant: 'borderless',
        children: 'Borderless Button',
    },
}

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Success Button',
    },
}

export const Error: Story = {
    args: {
        variant: 'error',
        children: 'Error Button',
    },
}

export const Plan: Story = {
    args: {
        variant: 'plan',
        children: 'Plan Button',
    },
}

export const ChartType: Story = {
    args: {
        variant: 'chartType',
        children: 'Chart Type',
    },
}

// Story pour les tailles
export const Sizes: Story = {
    render: () => (
        <VStack align="start" spacing={4}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Box width="300px">
                <Button size="xxl">Extra Extra Large</Button>
            </Box>
        </VStack>
    ),
}

// Story pour les états
export const States: Story = {
    render: () => (
        <VStack align="start" spacing={4}>
            <Button>Normal</Button>
            <Button isDisabled>Disabled</Button>
            <Button isLoading>Loading</Button>
            <Button isActive>Active</Button>
        </VStack>
    ),
}
