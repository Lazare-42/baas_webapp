import { ComponentStyleConfig } from '@chakra-ui/react'

export const Tabs: ComponentStyleConfig = {
    baseStyle: {
        tab: {
            color: 'dark.0',
            _selected: {
                color: 'dark.100',
                borderColor: 'dark.100',
                // bg: 'dark.100',
            },
            _active: {
                color: 'dark.100',
                borderColor: 'dark.100',
                // bg: 'dark.100',
            },
            _focus: {
                color: 'dark.100',
                borderColor: 'dark.100',
                // bg: 'dark.100',
            },
            _hover: {
                // color: 'dark.300',
                borderColor: 'dark.300',
                bg: 'dark.300',
            },
            rounded: 'md',
        },
    },
}
