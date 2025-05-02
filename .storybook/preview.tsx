import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { Preview } from '@storybook/react'
import React from 'react'
import theme from '../src/theme'
import '../src/theme/styles/global.css'

const preview: Preview = {
    decorators: [
        (Story) => (
            <ChakraProvider theme={theme}>
                <Flex bg="neutral.700" p={8} rounded="lg" color="neutral.50">
                    <Story />
                </Flex>
            </ChakraProvider>
        ),
    ],
    parameters: {
        backgrounds: {
            disable: true, // Désactive complètement le sélecteur de background
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
}

export default preview
