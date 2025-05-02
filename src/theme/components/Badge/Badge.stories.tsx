import { Badge, Stack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Badge component used to display status, labels or notifications. The base style includes a white color and rounded corners.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            description: 'The badge content',
            control: 'text',
        },
        bg: {
            description: 'Badge background color',
            control: 'color',
        },
        color: {
            description: 'Text color',
            control: 'color',
        },
        fontSize: {
            description: 'Text size',
            control: 'text',
        },
    },
    decorators: [
        (Story) => (
            <Stack spacing={4} direction="row">
                <Story />
            </Stack>
        ),
    ],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Badge',
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic version of the badge with default style.',
            },
        },
    },
}

export const Colors: Story = {
    render: () => (
        <>
            <Badge bg="primary.500">Primary</Badge>
            <Badge bg="success.500">Success</Badge>
            <Badge bg="error.500">Error</Badge>
            <Badge bg="warning.500">Warning</Badge>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different color variations available for the badge.',
            },
        },
    },
}

export const Sizes: Story = {
    render: () => (
        <>
            <Badge fontSize="0.8em">Small</Badge>
            <Badge fontSize="1em">Medium</Badge>
            <Badge fontSize="1.2em">Large</Badge>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story: 'The badge can be displayed in different sizes by adjusting the fontSize property.',
            },
        },
    },
}
