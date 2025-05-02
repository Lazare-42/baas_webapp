import { FormControl, FormLabel, Switch, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
    title: 'Theme/Components/Switch',
    component: Switch,
    parameters: {
        docs: {
            description: {
                component: 'Switch toggle avec thème primary par défaut.',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof Switch>

export const AllStates: Story = {
    args: {},
    render: () => (
        <VStack align="start" spacing={4}>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="default" mb="0">
                    Default
                </FormLabel>
                <Switch id="default" />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="checked" mb="0">
                    Checked
                </FormLabel>
                <Switch id="checked" defaultChecked />
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="disabled" mb="0">
                    Disabled
                </FormLabel>
                <Switch id="disabled" isDisabled />
            </FormControl>
        </VStack>
    ),
}
