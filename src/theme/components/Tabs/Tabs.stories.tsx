import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Tabs',
    component: Tabs,
    parameters: {
        docs: {
            description: {
                component: 'Tabs component with custom dark theme.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
    args: {},
    render: () => (
        <VStack align="start" width="full" maxW="500px">
            <Tabs width="full">
                <TabList>
                    <Tab>Tab 1</Tab>
                    <Tab>Tab 2</Tab>
                    <Tab>Tab 3</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>Content of Tab 1</TabPanel>
                    <TabPanel>Content of Tab 2</TabPanel>
                    <TabPanel>Content of Tab 3</TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    ),
}

export const States: Story = {
    args: {},
    render: () => (
        <VStack align="start" width="full" maxW="500px">
            <Tabs>
                <TabList>
                    <Tab>Active</Tab>
                    <Tab isDisabled>Disabled</Tab>
                    <Tab>Normal</Tab>
                </TabList>
            </Tabs>
        </VStack>
    ),
}
