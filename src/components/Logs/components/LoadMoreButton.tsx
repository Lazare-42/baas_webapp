// components/LogsTable/components/LoadMoreButton.tsx
import { Button, Spinner, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { PlusIcon } from '~/assets/icons'

import { useLogs } from '~/contexts/logs'
import {
    CALM_TIME,
    MAX_AUTO_LOAD_COUNT,
    MIN_RESULTS,
} from '~/contexts/logs/constants/table'

export const LoadMoreButton = () => {
    const { hasMore, isLoading, handleLoadMore, bots } = useLogs()

    const [isLocalLoading, setIsLocalLoading] = useState(false)
    const [loadCount, setLoadCount] = useState(0)
    const filteredCount = bots.length

    useEffect(() => {
        if (isLoading) {
            setIsLocalLoading(true)
        } else {
            const timer = setTimeout(() => {
                setIsLocalLoading(false)
            }, CALM_TIME)
            return () => clearTimeout(timer)
        }
    }, [isLoading])

    useEffect(() => {
        if (
            hasMore &&
            !isLoading &&
            loadCount < MAX_AUTO_LOAD_COUNT &&
            (filteredCount < MIN_RESULTS || filteredCount === 0)
        ) {
            setLoadCount((prev) => prev + 1)
            handleLoadMore()
        }
    }, [hasMore, isLoading, filteredCount, handleLoadMore, loadCount])

    if (!hasMore) return null

    return (
        <Tooltip
            label="More data is available, scroll down or click here"
            placement="top"
        >
            <Button
                variant="chartType"
                isActive={true}
                aria-label="Load more data"
                onClick={() => {
                    setLoadCount((prev) => prev + 1)
                    handleLoadMore()
                }}
                isLoading={isLocalLoading}
            >
                {isLocalLoading ? <Spinner /> : <PlusIcon />}
            </Button>
        </Tooltip>
    )
}
