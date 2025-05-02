import { Text, VStack } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'
import { fonts } from '../fonts'

const meta = {
    title: 'Theme/Foundations/Typography',
    parameters: {
        docs: {
            description: {
                component: 'Theme typography and fonts',
            },
        },
    },
} satisfies Meta

export default meta

export const Fonts = () => (
    <VStack align="start" spacing={6}>
        <VStack align="start" spacing={2}>
            <Text fontWeight="bold" fontSize="lg">
                Font Families
            </Text>
            {Object.entries(fonts).map(([name, value]) => (
                <Text key={name} fontFamily={value as string}>
                    {name}: {value}
                </Text>
            ))}
        </VStack>
    </VStack>
)
