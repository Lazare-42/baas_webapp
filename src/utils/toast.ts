import { createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast({
    defaultOptions: {
        duration: 5000,
        isClosable: true,
        position: 'top',
        variant: 'solid',
    },
})

export const message = {
    success: (message: string) => {
        toast({
            description: message,
            status: 'success',
            containerStyle: {
                backgroundColor: 'var(--chakra-colors-baas-success-500)',
                color: 'white',
            },
        })
    },
    error: (message: string) => {
        toast({
            description: message,
            status: 'error',
            containerStyle: {
                backgroundColor: 'var(--chakra-colors-baas-error-300)',
                color: 'white',
            },
        })
    },
    popup: (message: string | object) => {
        return toast({
            description:
                typeof message === 'string' ? message : JSON.stringify(message),
            status: 'warning',
            duration: null,
            containerStyle: {
                backgroundColor: 'var(--chakra-colors-baas-warning-500)',
                color: 'white',
            },
        })
    },
}
