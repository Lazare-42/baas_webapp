import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { checkout } from '~/api/subscription/routes'
import { CheckoutMode } from '~/api/subscription/types'

export function useHandlePurchase() {
    const toast = useToast()

    const handlePurchase = useCallback(
        async (
            productId: string,
            mode: CheckoutMode = 'payment',
            discount_percentage?: number,
        ) => {
            try {
                const response = await checkout({
                    plan_id: productId,
                    mode,
                    discount_percentage: discount_percentage,
                })
                if (response?.url) {
                    window.open(response.url, '_blank')
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'Failed to initiate checkout'
                toast({
                    title: 'Error',
                    description: errorMessage,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        },
        [toast],
    )

    return { handlePurchase }
}
