import { Heading, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Heading',
    component: Heading,
    parameters: {
        docs: {
            description: {
                component:
                    'Composant Heading avec style onboarding utilisant la police DM Sans.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
    render: () => (
        <VStack align="start" spacing={4}>
            <Heading>Default Heading</Heading>
            <Heading variant="onboarding">Onboarding Heading</Heading>
        </VStack>
    ),
}
