import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCSVDownload } from '~/hooks'

import { useTokenData } from '~/hooks/consumption'
import { ConsumptionContext } from './ConsumptionContext'
import { ConsumptionContextType, DateRange } from './types/types'
import { transformToTokenChartData } from './utils/transformers'

export function ConsumptionProvider({
    children,
}: {
    children: React.ReactNode
}) {
    // États de base avec leurs types
    const [costOrActivity, setCostOrActivity] =
        useState<ConsumptionContextType['costOrActivity']>('hours')
    const [dateRange, setDateRange] = useState<DateRange>(() => {
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 7)
        return {
            startDate: startDate,
            endDate: endDate,
        }
    })

    // Hooks personnalisés
    const { downloadCSV, isDownloading } = useCSVDownload()

    const { tokenConsumption, userTokens, isLoading, fetchTokenData } =
        useTokenData()

    // Transformations de données memoizées
    const { chartData } = useMemo(() => {
        if (!tokenConsumption || !dateRange.startDate || !dateRange.endDate)
            return { chartData: [] }

        return {
            chartData: transformToTokenChartData(
                tokenConsumption,
                dateRange.startDate,
                dateRange.endDate,
            ),
        }
    }, [tokenConsumption, dateRange.startDate, dateRange.endDate])

    // Calcul de totalTokens
    const totalTokens = useMemo(() => {
        if (!tokenConsumption) return 0
        return tokenConsumption.reduce(
            (sum, day) =>
                sum +
                day.consumption_by_service.recording_tokens +
                day.consumption_by_service.transcription_tokens +
                day.consumption_by_service.streaming_input_tokens +
                day.consumption_by_service.streaming_output_tokens,
            0,
        )
    }, [tokenConsumption, dateRange.startDate, dateRange.endDate])
    // Handlers
    const handleDateChange = useCallback((dates: Date[]) => {
        if (dates.length >= 2) {
            setDateRange({
                startDate: dates[0],
                endDate: dates[1],
            })
        } else if (dates.length === 1) {
            setDateRange({
                startDate: dates[0],
                endDate: null,
            })
        }
    }, [])

    const handleDownloadCSV = useCallback(() => {
        if (!chartData.length || !dateRange.startDate || !dateRange.endDate)
            return

        const csvData = chartData.map((day) => ({
            Date: format(day.date, 'yyyy-MM-dd'),
            Total: totalTokens,
            duration_hour: day.duration,
            recording_tokens: day.recording_tokens,
            transcription_hour: day.transcription_hour,
            transcription_tokens: day.transcription_tokens,
            streaming_input_hour: day.streaming_input_hour,
            streaming_input_tokens: day.streaming_input_tokens,
            streaming_output_hour: day.streaming_output_hour,
            streaming_output_tokens: day.streaming_output_tokens,
        }))

        downloadCSV(
            csvData,
            `consumption_${costOrActivity}_${format(
                dateRange.startDate,
                'yyyy-MM-dd',
            )}_to_${format(dateRange.endDate, 'yyyy-MM-dd')}`,
        )
    }, [costOrActivity, chartData, dateRange, downloadCSV])

    // Effects
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            fetchTokenData(dateRange.startDate, dateRange.endDate)
        }
    }, [fetchTokenData, dateRange])

    const value: ConsumptionContextType = {
        costOrActivity,
        setCostOrActivity,
        dateRange,
        chartData,
        totalTokens,
        userTokens,
        handleDateChange,
        handleDownloadCSV,
        isDownloading,
        isLoading,
    }

    return (
        <ConsumptionContext.Provider value={value}>
            {children}
        </ConsumptionContext.Provider>
    )
}
