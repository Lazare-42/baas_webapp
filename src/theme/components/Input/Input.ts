import { ComponentStyleConfig } from '@chakra-ui/react'

export const Input: ComponentStyleConfig = {
    baseStyle: {
        field: {
            _focusVisible: {
                border: 'neutral.900',
                boxShadow: 'none',
            },
            _focusWithin: {
                border: 'neutral.900',
                boxShadow: 'none',
            },
        },
    },
    parts: ['field', 'addon'],
    variants: {
        blackInput: {
            field: {
                height: '34px',
                bg: 'neutral.900',
                p: '5px 10px',
                cursor: 'text',
                mb: '8px',
                outline: 'none',
                color: 'white',
                pr: '34px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                _focus: {
                    border: '1px solid',
                    borderColor: 'neutral.700',
                },
            },
        },
        filled: {
            field: {
                fontSize: 'lg',
                color: 'neutral.900',
                borderWidth: '1px',
                fontWeight: 'semibold',
                type: 'text',
            },
        },
    },
}
