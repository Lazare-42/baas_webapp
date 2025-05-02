export const Toast = {
    baseStyle: {
        borderRadius: 'lg',
    },
    variants: {
        success: {
            bg: 'primary.500',
            color: 'neutral.900',
        },
        error: {
            bg: 'error.500',
            color: 'neutral.50',
        },
        warning: {
            bg: 'warning.500',
            color: 'neutral.900',
        },
    },
    defaultProps: {
        variant: 'success',
    },
}
