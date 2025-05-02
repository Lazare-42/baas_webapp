import { useCallback, useEffect, useState } from 'react'
import { SEARCH_DEBOUNCE_MS } from '~/contexts/logs/constants'
import { SearchState } from '~/contexts/logs/types/search'

export function useLogsSearch() {
    const [searchState, setSearchState] = useState<SearchState>({
        value: '',
        debouncedValue: '',
        results: {
            bots: [],
            content: [],
        },
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchState((prev) => ({
                ...prev,
                debouncedValue: prev.value,
            }))
        }, SEARCH_DEBOUNCE_MS)

        return () => clearTimeout(timer)
    }, [searchState.value])

    const setSearchValue = useCallback((value: string) => {
        setSearchState((prev) => ({
            ...prev,
            value,
        }))
    }, [])

    return { searchState, setSearchValue }
}
