import { Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Radio',
    component: Radio,
    parameters: {
        docs: {
            description: {
                component: 'Radio button with custom style.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={4}>
            <RadioGroup defaultValue="1">
                <Stack spacing={4}>
                    <Radio value="1">Option 1</Radio>
                    <Radio value="2">Option 2</Radio>
                    <Radio value="3" isDisabled>
                        Disabled Option
                    </Radio>
                </Stack>
            </RadioGroup>
        </VStack>
    ),
}
