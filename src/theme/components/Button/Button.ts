import { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
    baseStyle: {
        _disabled: { opacity: '1' },
        _hover: {
            _disabled: { opacity: '1' },
        },
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'semibold',
        lineHeight: '18px',
    },
    sizes: {
        sm: {
            px: '12px',
            py: '6px',
            fontSize: '14px',
            fontWeight: 'semibold',
            lineHeight: '24px',
        },
        md: {
            px: '18px',
            py: '12px',
        },
        lg: {
            px: '24px',
            py: '16px',
        },
        xxl: {
            w: '100%',
            px: '24px',
            py: '16px',
        },
    },
    variants: {
        chartType: {
            rounded: 'lg',
            fontWeight: 'regular',
            py: '2',
            px: '4',
            bg: 'transparent',
            color: 'neutral.50',
            _hover: {
                bg: 'primary.700',
            },
            _active: {
                _hover: {
                    bg: 'primary.700',
                },
                bg: 'neutral.500',
                color: 'primary.500',
            },
        },
        plan: {
            fontWeight: 'medium',
            width: 'full',
            transition: 'all 0.2s',
            _hover: {
                bg: 'primary.500',
                color: 'neutral.900',
            },
            _disabled: {
                opacity: 0.6,
                cursor: 'not-allowed',
            },
            bg: 'neutral.700',
            color: 'neutral.200',
            _active: {
                _hover: { bg: 'primary.500', color: 'neutral.900' },
                bg: 'primary.700',
                color: 'primary.500',
            },
        },
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
        success: {
            bg: 'success.500',
            color: 'neutral.50',
            _hover: {
                bg: 'success.700',
                _disabled: { bg: 'success.300' },
            },
            _focus: { bg: 'success.900' },
            _disabled: { bg: 'success.300' },
        },
        error: {
            bg: 'error.500',
            color: 'neutral.50',
            _hover: {
                bg: 'error.700',
                _disabled: { bg: 'error.300' },
            },
            _focus: { bg: 'error.900' },
            _disabled: { bg: 'error.300' },
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
                textDecoration: 'underline',
                color: 'primary.500',
                _disabled: { color: 'neutral.700' },
            },
            _focus: { bg: 'primary.700', color: 'primary.500' },
            _disabled: { bg: 'neutral.700' },
        },
    },

    defaultProps: {
        colorScheme: 'primary',
    },
}
