import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'
import { colors } from '../colors'

const meta = {
    title: 'Theme/Foundations/Colors',
    parameters: {
        docs: {
            description: {
                component: 'Theme color palette',
            },
        },
    },
} satisfies Meta

export default meta

const ColorPalette = ({
    colorName,
    palette,
}: {
    colorName: string
    palette: Record<string | number, string>
}) => (
    <VStack align="start" spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
            {colorName}
        </Text>
        <SimpleGrid columns={2} spacing={2} width="full">
            {Object.entries(palette).map(([shade, value]) => (
                <Box key={shade} p={4} bg={value as string} borderRadius="md">
                    <Text color={parseInt(shade) > 500 ? 'white' : 'black'}>
                        {colorName}.{shade}
                    </Text>
                </Box>
            ))}
        </SimpleGrid>
    </VStack>
)

export const Colors = () => (
    <VStack align="start" spacing={8}>
        {Object.entries(colors).map(([name, palette]) => (
            <ColorPalette
                key={name}
                colorName={name}
                palette={palette as Record<string | number, string>}
            />
        ))}
    </VStack>
)
