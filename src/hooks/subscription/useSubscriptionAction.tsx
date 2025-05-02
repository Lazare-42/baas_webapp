import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import {
    cancelSubscription,
    createBillingPortal,
} from '~/api/subscription/routes'

export function useSubscriptionActions() {
    const toast = useToast()

    const handleCancelSubscription = useCallback(async () => {
        try {
            await cancelSubscription()
            toast({
                title: 'Success',
                description: 'Your subscription has been cancelled',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to cancel subscription',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [toast])

    const handleOpenBillingPortal = useCallback(async () => {
        try {
            const response = await createBillingPortal()
            if (response.url) {
                window.open(response.url, '_blank')
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to open billing portal',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }, [toast])

    return {
        cancelSubscription: handleCancelSubscription,
        openBillingPortal: handleOpenBillingPortal,
    }
}
