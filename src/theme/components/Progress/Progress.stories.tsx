import { Progress, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Progress',
    component: Progress,
    parameters: {
        docs: {
            description: {
                component:
                    'Progress bar with state variants (error, warning, success).',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof Progress>

export const AllVariants: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={6} width="full" maxW="400px">
            <VStack align="start" width="full">
                <Text>Default:</Text>
                <Progress value={60} width="full" />
            </VStack>

            <VStack align="start" width="full">
                <Text>Error:</Text>
                <Progress value={30} variant="baasError" width="full" />
            </VStack>

            <VStack align="start" width="full">
                <Text>Warning:</Text>
                <Progress value={50} variant="baasWarning" width="full" />
            </VStack>

            <VStack align="start" width="full">
                <Text>Success:</Text>
                <Progress value={80} variant="baasSuccess" width="full" />
            </VStack>
        </VStack>
    ),
}
