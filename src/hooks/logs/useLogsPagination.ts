// hooks/logs/useLogsPagination.ts
import { useCallback, useState } from 'react'
import { fetchBots } from '~/api/bots/routes'
import { BotData } from '~/api/bots/types'
import { MAX_AUTO_LOAD_COUNT, PAGE_SIZE_BOTS } from '~/contexts/logs/constants'

interface LoadMoreParams {
    startDate?: string
    endDate?: string
    searchValue?: string
}

export function useLogsPagination() {
    const [botsData, setBotsData] = useState<BotData[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [loadCount, setLoadCount] = useState(0)

    const loadMore = useCallback(
        async ({ startDate, endDate, searchValue }: LoadMoreParams) => {
            if (isLoading || loadCount >= MAX_AUTO_LOAD_COUNT) return

            setIsLoading(true)
            try {
                const response = await fetchBots({
                    offset: botsData.length,
                    limit: PAGE_SIZE_BOTS,
                    start_date: startDate,
                    end_date: endDate,
                    ...(searchValue && { bot_id: searchValue }),
                })
                setBotsData((prev) => [...prev, ...response.bots])
                setHasMore(response.has_more)
                setLoadCount((prev) => prev + 1)
            } catch (error) {
                console.error('Error loading more bots:', error)
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        [botsData.length, isLoading, loadCount],
    )

    return {
        botsData,
        hasMore,
        isLoading,
        setIsLoading,
        loadMore,
        resetPagination: useCallback(() => {
            setBotsData([])
            setHasMore(true)
            setLoadCount(0)
        }, []),
    }
}
