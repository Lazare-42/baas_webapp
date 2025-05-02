import { Text, Textarea, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Textarea',
    component: Textarea,
    parameters: {
        docs: {
            description: {
                component:
                    'Textarea component with templatePara variant for template paragraphs.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
    args: {
        placeholder: 'Enter your text here...',
    },
}

export const AllVariants: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={6} width="full">
            <VStack align="start" width="full">
                <Text fontWeight="bold">Default Textarea:</Text>
                <Textarea placeholder="Default textarea..." />
            </VStack>

            <VStack align="start" width="full">
                <Text fontWeight="bold">Template Paragraph Variant:</Text>
                <Textarea
                    variant="templatePara"
                    placeholder="Template paragraph..."
                    defaultValue="This is a template paragraph with specific styling for minimal height and transparent background."
                />
            </VStack>

            <VStack align="start" width="full">
                <Text fontWeight="bold">Disabled State:</Text>
                <Textarea
                    variant="templatePara"
                    isDisabled
                    defaultValue="Disabled template paragraph textarea"
                />
            </VStack>
        </VStack>
    ),
}

export const States: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={4} width="full">
            <Textarea placeholder="Normal state" />
            <Textarea placeholder="Disabled state" isDisabled />
            <Textarea placeholder="Invalid state" isInvalid />
            <Textarea
                placeholder="Read only"
                readOnly
                defaultValue="This is read only"
            />
        </VStack>
    ),
}
