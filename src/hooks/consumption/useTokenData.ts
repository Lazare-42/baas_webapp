// hooks/consumption/useTokenData.ts
import { useCallback, useState } from 'react'
import { getTokenConsumption, getUserTokens } from '~/api/consumption/routes'
import {
    DailyTokenConsumption,
    UserTokensResponse,
} from '~/api/consumption/types'

export function useTokenData() {
    const [tokenConsumption, setTokenConsumption] = useState<
        DailyTokenConsumption[]
    >([])
    const [userTokens, setUserTokens] = useState<UserTokensResponse | null>(
        null,
    )
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTokenData = useCallback(
        async (startDate: Date, endDate: Date) => {
            try {
                setIsLoading(true)
                const [consumptionResponse, statsResponse] = await Promise.all([
                    getTokenConsumption({
                        start_date: startDate,
                        end_date: endDate,
                    }),
                    getUserTokens(),
                ])
                setTokenConsumption(consumptionResponse)
                setUserTokens(statsResponse)
            } catch (err) {
                console.error('Error fetching token data:', err)
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch token data',
                )
            } finally {
                setIsLoading(false)
            }
        },
        [],
    )

    return {
        tokenConsumption,
        userTokens,
        isLoading,
        error,
        fetchTokenData,
    }
}
