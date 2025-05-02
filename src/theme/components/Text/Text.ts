import { ComponentStyleConfig } from '@chakra-ui/react'

export const Text: ComponentStyleConfig = {
    baseStyle: {
        my: 'auto',
    },
    variants: {
        summary: {
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '16px',
        },
        summaryBottom: {
            textColor: 'neutral.100',
            fontWeight: '600',
            fontSize: '14px',
            lineHeight: '24px',
        },
        selectedOption: {
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: 'calc(100% - 24px)',
            textAlign: 'left',
        },
        ellipsis: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        agendaTitle: {
            textColor: 'neutral.900',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '24px',
        },
        inputTitle: {
            fontWeight: '700',
        },
        onboarding: {
            fontFamily: 'DM Sans',
            fontWeight: 'light',
        },
    },
}
