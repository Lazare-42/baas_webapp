// contexts/logs/types/context.ts
import { SetStateAction } from 'react'
import { BotData } from '~/api/bots/types'
import { SearchResults } from './search'
import { TableState } from './table'

export interface DateRange {
    startDate: string
    endDate: string
}

export interface LoadedDateRange {
    minDate: string
    maxDate: string
}

export interface LogsContextType {
    // Table state
    tableState: TableState
    setTableState: (
        state: TableState | ((prev: TableState) => TableState),
    ) => void

    // Date handling
    dateRange: DateRange
    setDateRange: (range: SetStateAction<DateRange>) => void
    loadedDateRange: LoadedDateRange
    handleDateChange: (dates: Date[]) => void

    // Search state
    searchValue: string
    setSearchValue: (value: string) => void
    searchResults: SearchResults

    // Data & Pagination
    bots: BotData[]
    hasMore: boolean
    isLoading: boolean
    handleLoadMore: () => Promise<void>
    resetPagination: () => void
    setIsLoading: (value: boolean) => void
    // Utilities
    getFilteredBots: () => BotData[]
    getSearchResults: () => SearchResults
}
