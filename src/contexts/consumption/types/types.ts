// contexts/consumption/types.ts
import { UserTokensResponse } from '~/api/consumption/types'
import { TransformedChartData } from './chart'

export type DateRange = {
    startDate: Date | null
    endDate: Date | null
}

export type ConsumptionContextType = {
    costOrActivity: 'hours' | 'tokens'
    setCostOrActivity: (value: 'hours' | 'tokens') => void
    dateRange: DateRange
    chartData: TransformedChartData[]
    totalTokens: number
    userTokens: UserTokensResponse | null
    handleDateChange: (dates: Date[]) => void
    handleDownloadCSV: () => void
    isDownloading: boolean
    isLoading: boolean
}
