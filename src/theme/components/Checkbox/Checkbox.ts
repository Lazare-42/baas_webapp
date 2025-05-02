import { ComponentStyleConfig } from '@chakra-ui/react'

export const Checkbox: ComponentStyleConfig = {
    baseStyle: {
        control: {
            borderRadius: 'sm',
            border: '1px solid',
            rounded: '4px',
            bg: 'white',
            borderColor: 'primary.500',
            _checked: {
                bg: 'primary.500',
                borderColor: 'primary.500',
                color: 'white',
                _hover: {
                    bg: 'primary.500',
                },
            },
            _hover: {
                bg: 'primary.50',
            },
        },
    },
    variants: {
        white: {
            bg: 'white',
            borderColor: 'black',
        },
        baas: {
            control: {
                bg: 'none',
                borderColor: 'neutral.500',
                _checked: {
                    bg: 'primary.700',
                    borderColor: 'neutral.700',
                    color: 'primary.500',
                    _hover: {
                        bg: 'primary.700',
                    },
                },
                _hover: {
                    bg: 'primary.700',
                },
            },
        },
    },
}
