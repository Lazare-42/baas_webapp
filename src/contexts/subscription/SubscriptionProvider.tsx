import { ReactNode, useCallback, useEffect, useState } from 'react'
import { PlanType } from '~/api/subscription/types'

import { useHandlePurchase } from '~/hooks/subscription/useHandlePurchase'
import { usePlansData } from '~/hooks/subscription/usePlanData'
import { usePaymentStatus } from '~/hooks/subscription/useSubscription'
import { useSubscriptionActions } from '~/hooks/subscription/useSubscriptionAction'
import { useSubscriptionData } from '~/hooks/subscription/useSubscriptionData'
import { SubscriptionContext } from './SubscriptionContext'
import { PlanInfo, TokenPackInfo } from './types'

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    usePaymentStatus()
    const { subscription, currentPlan, setCurrentPlan, loadCurrentPlan } =
        useSubscriptionData()

    const { plansInfo, tokenPacks, isLoading, error, loadPlansData } =
        usePlansData()

    const { handlePurchase } = useHandlePurchase()

    const { cancelSubscription, openBillingPortal } = useSubscriptionActions()

    const [highlightedPlan, setHighlightedPlan] = useState<PlanType | null>(
        'PayAsYouGo',
    )

    useEffect(() => {
        const initializeData = async () => {
            await Promise.all([loadPlansData(), loadCurrentPlan()])
        }

        initializeData()
    }, [loadPlansData, loadCurrentPlan])

    const getPlanInfo = useCallback(
        (planTitle: string): PlanInfo | null => {
            return plansInfo[planTitle] || null
        },
        [plansInfo],
    )

    const getTokenPacks = useCallback((): TokenPackInfo[] => {
        return Object.values(tokenPacks)
    }, [tokenPacks])

    const isHighlighted = useCallback(
        (planType: PlanType): boolean => {
            return highlightedPlan === planType
        },
        [highlightedPlan],
    )

    const value = {
        subscription,
        currentPlan,
        setCurrentPlan,
        highlightedPlan,
        setHighlightedPlan,
        isHighlighted,
        handlePurchase,
        getPlanInfo,
        getTokenPacks,
        isLoading,
        error,
        plansInfo,
        cancelSubscription,
        openBillingPortal,
    }

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    )
}
