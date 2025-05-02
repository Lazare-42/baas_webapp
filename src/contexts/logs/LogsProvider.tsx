import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { useLogsPagination } from '~/hooks/logs/useLogsPagination'
import { useLogsSearch } from '~/hooks/logs/useLogsSearch'
import { useLogsTable } from '~/hooks/logs/useLogsTable'
import { LogsContext } from './LogsContext'
import { DateRange, LoadedDateRange } from './types/context'
import { getBotMatches } from './utils/search'

interface LogsProviderProps {
    children: ReactNode
}

export const LogsProvider = ({ children }: LogsProviderProps) => {
    const { tableState, setTableState } = useLogsTable()
    const { searchState, setSearchValue } = useLogsSearch()
    const {
        botsData,
        hasMore,
        isLoading,
        setIsLoading,
        loadMore,
        resetPagination,
    } = useLogsPagination()

    // Ref pour éviter les appels multiples à loadMore
    const isLoadingRef = useRef(false)
    // Ref pour tracker si on est en train d'étendre les dates
    const isExtendingDatesRef = useRef(false)

    const [dateRange, setDateRange] = useState<DateRange>(() => {
        const now = new Date()
        now.setHours(23, 59, 59, 0)

        const twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
        twoWeeksAgo.setHours(0, 0, 0, 0)

        return {
            startDate: twoWeeksAgo.toISOString().split('T')[0],
            endDate: now.toISOString().split('T')[0],
        }
    })

    const [filterDateRange, setFilterDateRange] = useState<DateRange>(() => {
        const now = new Date()
        now.setHours(23, 59, 59, 0)

        const twoWeeksAgo = new Date()
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
        twoWeeksAgo.setHours(0, 0, 0, 0)

        return {
            startDate: twoWeeksAgo.toISOString().split('T')[0],
            endDate: now.toISOString().split('T')[0],
        }
    })

    const loadingDateRangeRef = useRef<DateRange>(filterDateRange)

    const [loadedDateRange, setLoadedDateRange] = useState<LoadedDateRange>({
        minDate: '',
        maxDate: '',
    })

    useEffect(() => {
        loadingDateRangeRef.current = filterDateRange
        resetPagination()
        handleLoadMore()
    }, [filterDateRange.startDate, filterDateRange.endDate])

    const handleDateChange = useCallback((dates: Date[]) => {
        isExtendingDatesRef.current = false
        if (dates.length >= 2) {
            const newDateRange = {
                startDate: dates[0].toISOString().split('T')[0],
                endDate: dates[1].toISOString().split('T')[0],
            }
            setDateRange(newDateRange)
            setFilterDateRange(newDateRange) // Ajouter cette ligne
        } else if (dates.length === 1) {
            const newDateRange = {
                startDate: dates[0].toISOString().split('T')[0],
                endDate: '',
            }
            setDateRange(newDateRange)
            setFilterDateRange(newDateRange) // Ajouter cette ligne
        }
    }, [])
    // Mémoiser la fonction de reset
    const handleReset = useCallback(() => {
        if (!isExtendingDatesRef.current) {
            resetPagination()
            handleLoadMore()
        }
    }, [resetPagination])

    useEffect(() => {
        handleReset()
    }, [dateRange.startDate, dateRange.endDate])

    // Mémoiser la mise à jour des dates chargées
    const updateLoadedDateRange = useCallback(() => {
        if (botsData.length) {
            const dates = botsData.map((bot) =>
                new Date(bot.bot.created_at).getTime(),
            )
            setLoadedDateRange({
                minDate: new Date(Math.min(...dates))
                    .toISOString()
                    .split('T')[0],
                maxDate: new Date(Math.max(...dates))
                    .toISOString()
                    .split('T')[0],
            })
        }
    }, [botsData])

    useEffect(() => {
        updateLoadedDateRange()
    }, [botsData])

    const filteredBots = useMemo(() => {
        if (!searchState.value) return botsData

        return botsData.filter((bot) => {
            const { matches } = getBotMatches(
                bot,
                searchState.value.toLowerCase(),
            )
            return matches
        })
    }, [botsData, searchState.value])

    const searchResults = useMemo(() => {
        if (!searchState.value) return { botResults: [], contentResults: [] }

        const searchTerm = searchState.value.toLowerCase()
        const filteredBotResults = botsData
            .filter((bot) => bot.bot.uuid.toLowerCase().includes(searchTerm))
            .map((bot) => ({
                id: bot.bot.uuid,
                name: bot.params.bot_name,
            }))

        const filteredContentResults = botsData
            .filter((bot) => {
                const { matches } = getBotMatches(bot, searchTerm)
                return (
                    matches && !bot.bot.uuid.toLowerCase().includes(searchTerm)
                )
            })
            .map((bot) => ({
                id: bot.bot.uuid,
                match: bot.params.bot_name,
            }))

        return {
            botResults: filteredBotResults,
            contentResults: filteredContentResults,
        }
    }, [botsData, searchState.value])

    const handleLoadMore = useCallback(async () => {
        if (
            !loadingDateRangeRef.current.startDate ||
            !loadingDateRangeRef.current.endDate ||
            isLoading
        )
            return

        try {
            const result = await loadMore({
                startDate: loadingDateRangeRef.current.startDate,
                endDate: loadingDateRangeRef.current.endDate,
                searchValue: searchState.value,
            })

            if (!hasMore) {
                // Étendre seulement la date de chargement, pas le filtre
                const newStartDate = new Date(
                    loadingDateRangeRef.current.startDate,
                )
                newStartDate.setDate(newStartDate.getDate() - 14)

                loadingDateRangeRef.current = {
                    ...loadingDateRangeRef.current,
                    startDate: newStartDate.toISOString().split('T')[0],
                }
            }
            return result
        } catch (error) {
            console.error('Error loading more data:', error)
        }
    }, [loadMore, searchState.value, isLoading, hasMore])

    // Mémoiser la valeur du contexte pour éviter les re-renders inutiles
    const value = useMemo(
        () => ({
            tableState,
            setTableState,
            searchValue: searchState.value,
            setSearchValue,
            searchResults,
            dateRange: filterDateRange,
            setDateRange,
            loadedDateRange,
            handleDateChange,
            bots: filteredBots,
            hasMore: true,
            isLoading,
            setIsLoading,
            handleLoadMore,
            resetPagination,
            getFilteredBots: () => filteredBots,
            getSearchResults: () => searchResults,
        }),
        [
            tableState,
            searchState.value,
            searchResults,
            dateRange,
            loadedDateRange,
            filteredBots,
            isLoading,
            handleLoadMore,
            handleDateChange,
        ],
    )

    return <LogsContext.Provider value={value}>{children}</LogsContext.Provider>
}
