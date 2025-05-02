import { ComponentStyleConfig } from '@chakra-ui/react'

export const Progress: ComponentStyleConfig = {
    baseStyle: {
        track: {
            bg: 'baas.neutral.700',
        },
    },
    defaultProps: {
        size: 'sm',
        borderRadius: 'full',
    },
    variants: {
        baasError: {
            filledTrack: {
                bg: 'baas.error.500',
            },
        },
        baasWarning: {
            filledTrack: {
                bg: 'baas.warning.500',
            },
        },
        baasSuccess: {
            filledTrack: {
                bg: 'baas.primary.700',
            },
        },
    },
}
