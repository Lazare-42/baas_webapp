import { Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Text',
    component: Text,
    parameters: {
        docs: {
            description: {
                component:
                    'Text component with different variants for different usage contexts.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof Text>

export const AllVariants: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={6} width="full">
            <Text variant="summary">Summary - Regular text for summaries</Text>

            <Text variant="summaryBottom" bg="neutral.700">
                Summary Bottom - Used for bottom information
            </Text>

            <Text variant="selectedOption" width="200px">
                Selected Option - This is a very long text that should be
                truncated with ellipsis
            </Text>

            <Text variant="ellipsis" width="200px">
                This is a text that should be truncated with ellipsis when it
                becomes too long
            </Text>

            <Text variant="agendaTitle">
                Agenda Title - Used for agenda headers
            </Text>

            <Text variant="inputTitle">
                Input Title - Bold text for input labels
            </Text>

            <Text variant="onboarding">
                Onboarding Text - Using DM Sans font
            </Text>
        </VStack>
    ),
}
