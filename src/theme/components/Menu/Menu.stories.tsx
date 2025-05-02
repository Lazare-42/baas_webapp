import {
    Button,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import {
    ChevronDownIcon,
    DownloadArrowIcon,
    ExitLeftArrowIcon,
    SettingIcon,
} from '~/assets/icons'

const meta = {
    title: 'Theme/Components/Menu',
    component: Menu,
    parameters: {
        docs: {
            description: {
                component:
                    'Menu component with white, dark and speedMenu variants.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof Menu>

// Default story
export const Default: Story = {
    args: {},
    render: () => (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Actions
            </MenuButton>
            <MenuList>
                <MenuItem icon={<Icon as={DownloadArrowIcon} />}>
                    Profile
                </MenuItem>
                <MenuItem icon={<Icon as={SettingIcon} />}>Settings</MenuItem>
                <MenuItem icon={<Icon as={ExitLeftArrowIcon} />}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    ),
}

// All variants
export const AllVariants: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={8}>
            <VStack align="start" spacing={2}>
                <Text fontWeight="bold">White Variant:</Text>
                <Menu variant="white">
                    <MenuButton as={Button}>White Menu</MenuButton>
                    <MenuList>
                        <MenuItem>Option 1</MenuItem>
                        <MenuItem>Option 2</MenuItem>
                        <MenuItem>Option 3</MenuItem>
                    </MenuList>
                </Menu>
            </VStack>

            <VStack align="start" spacing={2}>
                <Text fontWeight="bold">Dark Variant:</Text>
                <Menu variant="dark">
                    <MenuButton as={Button}>Dark Menu</MenuButton>
                    <MenuList>
                        <MenuItem>Option 1</MenuItem>
                        <MenuItem>Option 2</MenuItem>
                        <MenuItem>Option 3</MenuItem>
                    </MenuList>
                </Menu>
            </VStack>

            <VStack align="start" spacing={2}>
                <Text fontWeight="bold">Speed Menu:</Text>
                <Menu variant="speedMenu">
                    <MenuButton as={Button}>Speed</MenuButton>
                    <MenuList>
                        <MenuItem>1x</MenuItem>
                        <MenuItem>1.5x</MenuItem>
                        <MenuItem>2x</MenuItem>
                    </MenuList>
                </Menu>
            </VStack>
        </VStack>
    ),
}
