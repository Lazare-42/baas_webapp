import { useCallback, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { fetchSubscriptionInfo } from '~/api/subscription/routes'
import { Subscription } from '~/api/subscription/types'
import { PlanType } from '~/api/subscription/types'

export function useSubscriptionData() {
    const [subscription, setSubscription] = useState<Subscription | null>(null)
    const [currentPlan, setCurrentPlan] = useState<PlanType>('PayAsYouGo')
    const [hasLoadedPlan, setHasLoadedPlan] = useState(false)
    const toast = useToast()

    const loadCurrentPlan = useCallback(async () => {
        if (hasLoadedPlan) return

        try {
            const response = await fetchSubscriptionInfo()
            setSubscription(response)
            if (response.product) {
                setCurrentPlan(response.product)
            }
            setHasLoadedPlan(true)
        } catch (error) {
            // ... gestion d'erreur
        }
    }, [hasLoadedPlan, toast])

    return { subscription, currentPlan, setCurrentPlan, loadCurrentPlan }
}
