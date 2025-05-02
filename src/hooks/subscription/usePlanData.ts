// hooks/subscription/usePlansData.ts
import { useToast } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { fetchProductWithPrices } from '~/api/subscription/routes'
import { PlanType, ProductWithPricesResponse } from '~/api/subscription/types'
import { STRIPE_ENV } from '~/config/stripe_env'
import { PlanInfo, TokenPackInfo } from '~/contexts/subscription'
import { defaultPlanInfo } from '~/contexts/subscription/utils/constants'
import {
    getActivePrice,
    getFeatures,
} from '~/contexts/subscription/utils/helpers'

export function usePlansData() {
    const [plansInfo, setPlansInfo] = useState<Record<string, PlanInfo>>({
        PayAsYouGo: defaultPlanInfo,
    })
    const [tokenPacks, setTokenPacks] = useState<Record<string, TokenPackInfo>>(
        {},
    )
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasLoadedData, setHasLoadedData] = useState(false)
    const toast = useToast()

    const transformProductToPlanInfo = useCallback(
        (
            response: ProductWithPricesResponse,
            title: string,
            type: PlanType,
        ): PlanInfo => {
            // Notons que response est déjà le .data de la réponse axios
            const activePrice = getActivePrice(response.prices)
            return {
                concurrentBots: parseInt(
                    response.product.metadata.concurrentBots,
                ),
                requestsPerSecond: parseInt(
                    response.product.metadata.requestsPerSecond,
                ),
                tokenDiscount: parseInt(
                    response.product.metadata.tokenDiscount,
                ),
                price: (activePrice.unit_amount / 100).toString(),
                billingScheme: activePrice.billing_scheme,
                currency: activePrice.currency,
                interval: activePrice.recurring.interval,
                active: response.product.active,
                livemode: response.product.livemode,
                title,
                type,
            }
        },
        [],
    )

    const transformToTokenPack = useCallback(
        (
            response: ProductWithPricesResponse,
            title: string,
            isHighlighted = false,
        ): TokenPackInfo => {
            // Même chose ici, response est déjà le .data
            const activePrice = getActivePrice(response.prices)
            const tokens = parseInt(response.product.metadata.tokens)

            return {
                title,
                price: activePrice.unit_amount/100,
                stripe_price_id: activePrice.id,
                tokens,
                features: getFeatures(tokens),
                isHighlighted,
            }
        },
        [],
    )

    const loadPlansData = useCallback(async () => {
        if (hasLoadedData) return

        setIsLoading(true)
        setError(null)

        try {
            const [scale, enterprise, starter, pro, business, enterprisePack] =
                await Promise.all([
                    fetchProductWithPrices(STRIPE_ENV.stripe.products.scale.id),
                    fetchProductWithPrices(
                        STRIPE_ENV.stripe.products.enterprise.id,
                    ),
                    fetchProductWithPrices(
                        STRIPE_ENV.stripe.products.packs.starter.id,
                    ),
                    fetchProductWithPrices(
                        STRIPE_ENV.stripe.products.packs.pro.id,
                    ),
                    fetchProductWithPrices(
                        STRIPE_ENV.stripe.products.packs.business.id,
                    ),
                    fetchProductWithPrices(
                        STRIPE_ENV.stripe.products.packs.enterprise.id,
                    ),
                ])

            // Notez qu'on utilise directement la réponse sans .data car fetchProductWithPrices retourne déjà les données
            setPlansInfo({
                PayAsYouGo: defaultPlanInfo,
                ScaleAPI: transformProductToPlanInfo(
                    scale,
                    'Scale API',
                    'ScaleAPI',
                ),
                EnterpriseAPI: transformProductToPlanInfo(
                    enterprise,
                    'Enterprise API',
                    'EnterpriseAPI',
                ),
            })

            setTokenPacks({
                'Starter Pack': transformToTokenPack(starter, 'Starter Pack'),
                'Pro Pack': transformToTokenPack(pro, 'Pro Pack'),
                'Business Pack': transformToTokenPack(
                    business,
                    'Business Pack',
                ),
                'Enterprise Pack': transformToTokenPack(
                    enterprisePack,
                    'Enterprise Pack',
                    true,
                ),
            })

            setHasLoadedData(true)
        } catch (error) {
            // ... gestion d'erreur existante ...
        } finally {
            setIsLoading(false)
        }
    }, [hasLoadedData, toast, transformProductToPlanInfo, transformToTokenPack])

    return {
        plansInfo,
        tokenPacks,
        isLoading,
        error,
        loadPlansData,
    }
}
