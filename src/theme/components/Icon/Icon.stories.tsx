import { HStack, Icon } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { BillIcon, BooksIcon, WarningIcon } from '~/assets/icons'

const meta = {
    title: 'Theme/Components/Icon',
    component: Icon,
    parameters: {
        docs: {
            description: {
                component:
                    'Composant Icon avec taille par défaut de 14px et alignement vertical.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <HStack spacing={4}>
            <Icon as={BillIcon} />
            <Icon as={BooksIcon} />
            <Icon as={WarningIcon} />
        </HStack>
    ),
}
