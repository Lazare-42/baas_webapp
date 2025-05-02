import { ComponentStyleConfig } from '@chakra-ui/react'

export const IconButton: ComponentStyleConfig = {
    baseStyle: {
        _disabled: { opacity: '1' },
        _hover: {
            _disabled: { opacity: '1' },
        },
        borderRadius: '8px',
    },
    sizes: {
        xxs: {
            p: '1px',
            borderRadius: '1px',
            fontSize: '11px',
            fontWeight: 'regular',
            lineHeight: '16px',
        },
        xs: {
            p: '2px',
            borderRadius: '4px',
            fontSize: '20px',
            fontWeight: 'regular',
            lineHeight: '22px',
        },
        sm: {
            p: '7px',
            borderRadius: '6px',
            fontSize: '22px',
            fontWeight: 'regular',
            lineHeight: '24px',
        },
        md: {
            p: '7px',
            fontSize: '28px',
            fontWeight: 'semibold',
            lineHeight: '30px',
        },
        lg: {
            p: '16px',
            fontSize: '28px',
            fontWeight: 'semibold',
            lineHeight: '30px',
        },
    },
    variants: {
        filled: {
            bg: 'primary.500',
            color: 'neutral.50',
            _hover: {
                bg: 'primary.700',
                _disabled: { bg: 'primary.300' },
            },
            _focus: { bg: 'primary.900' },
            _disabled: { bg: 'primary.300' },
        },
        ghost: {
            border: '2px',
            borderColor: 'primary.500',
            color: 'primary.500',
            _hover: {
                bg: '',
                borderColor: 'primary.700',
                color: 'primary.700',
                _disabled: {
                    borderColor: 'primary.300',
                    color: 'primary.300',
                    opacity: '1',
                },
            },
            _focus: {
                borderColor: 'primary.900',
                color: 'primary.900',
                opacity: '1',
            },
            _disabled: { borderColor: 'primary.300', color: 'primary.300' },
        },
        borderless: {
            color: 'primary.500',
            _hover: {
                bg: 'primary.50',
                color: 'primary.700',
                _disabled: { color: 'primary.50' },
            },
            _focus: { bg: 'primary.50', color: 'primary.900' },
            _disabled: { bg: 'primary.300' },
        },
    },
    defaultProps: {
        variant: 'filled',
    },
}
