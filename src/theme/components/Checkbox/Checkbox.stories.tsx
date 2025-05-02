import { Checkbox, HStack, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['white', 'baas'],
            control: { type: 'select' },
        },
        isChecked: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Default Checkbox
export const Default: Story = {
    args: {
        children: 'Default Checkbox',
    },
}

// All Variants
export const AllVariants: Story = {
    render: () => (
        <VStack align="flex-start" spacing={4}>
            <HStack spacing={4}>
                <Text fontWeight="bold" minW="100px">
                    Default:
                </Text>
                <Checkbox>Default</Checkbox>
                <Checkbox isChecked>Checked</Checkbox>
                <Checkbox isDisabled>Disabled</Checkbox>
                <Checkbox isDisabled isChecked>
                    Disabled Checked
                </Checkbox>
            </HStack>

            <HStack spacing={4}>
                <Text fontWeight="bold" minW="100px">
                    White:
                </Text>
                <Checkbox variant="white">White</Checkbox>
                <Checkbox variant="white" isChecked>
                    Checked
                </Checkbox>
                <Checkbox variant="white" isDisabled>
                    Disabled
                </Checkbox>
                <Checkbox variant="white" isDisabled isChecked>
                    Disabled Checked
                </Checkbox>
            </HStack>

            <HStack spacing={4}>
                <Text fontWeight="bold" minW="100px">
                    Baas:
                </Text>
                <Checkbox variant="baas">Baas</Checkbox>
                <Checkbox variant="baas" isChecked>
                    Checked
                </Checkbox>
                <Checkbox variant="baas" isDisabled>
                    Disabled
                </Checkbox>
                <Checkbox variant="baas" isDisabled isChecked>
                    Disabled Checked
                </Checkbox>
            </HStack>
        </VStack>
    ),
}

// States
export const States: Story = {
    render: () => (
        <VStack align="flex-start" spacing={4}>
            <Checkbox>Unchecked</Checkbox>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox isIndeterminate>Indeterminate</Checkbox>
            <Checkbox isDisabled>Disabled</Checkbox>
            <Checkbox isDisabled isChecked>
                Disabled Checked
            </Checkbox>
        </VStack>
    ),
}

// Group Example
export const CheckboxGroup: Story = {
    render: () => (
        <VStack align="flex-start" spacing={4}>
            {['default', 'white', 'baas'].map((variant) => (
                <VStack key={variant} align="flex-start" spacing={2}>
                    <Text fontWeight="bold" textTransform="capitalize">
                        {variant} Group:
                    </Text>
                    <HStack spacing={4}>
                        <Checkbox variant={variant}>Option 1</Checkbox>
                        <Checkbox variant={variant}>Option 2</Checkbox>
                        <Checkbox variant={variant}>Option 3</Checkbox>
                    </HStack>
                </VStack>
            ))}
        </VStack>
    ),
}

// Interactive Example
export const Interactive: Story = {
    args: {
        children: 'Interactive Checkbox',
        variant: 'default',
        isChecked: false,
        isDisabled: false,
    },
}
