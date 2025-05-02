// hooks/logs/useTableCSV.ts
import { Table } from '@tanstack/react-table'
import { BotData } from '~/api/bots/types'
import { EMPTY_TEXT } from '~/contexts/logs/constants/table'
import { DateRange } from '~/contexts/logs/types/context'

import { useCSVDownload } from '~/hooks/useCSVDownload'

export const useTableCSV = (table: Table<BotData>, dateRange: DateRange) => {
    const { downloadCSV, isDownloading } = useCSVDownload()

    const handleDownloadCSV = () => {
        const filteredRows = table.getFilteredRowModel().rows
        const visibleColumns = table
            .getAllColumns()
            .filter((col) => col.getIsVisible())

        const data = filteredRows.map((row) => {
            const rowData: Record<string, string | number> = {}

            visibleColumns.forEach((col) => {
                const header =
                    typeof col.columnDef.header === 'string'
                        ? col.columnDef.header
                        : col.id
                let value = col.accessorFn
                    ? col.accessorFn(row.original, row.index)
                    : row.getValue(col.id)

                // Special column handling
                if (col.id === 'Status') {
                    if (row.original.bot?.errors)
                        value = `Error: ${row.original.bot.errors}`
                    else if (row.original.bot?.ended_at) value = 'Ended'
                    else if (row.original.duration > 0) value = 'Active'
                    else value = 'Pending'
                } else if (col.id === 'Duration') {
                    const duration = row.original.duration
                    if (!duration) value = EMPTY_TEXT
                    else {
                        const hours = Math.floor(duration / 3600)
                        const minutes = Math.floor((duration % 3600) / 60)
                        const seconds = duration % 60
                        if (hours > 0) {
                            value =
                                minutes > 0
                                    ? `${hours}h ${minutes}m`
                                    : `${hours}h`
                        } else if (minutes > 0) {
                            value =
                                seconds > 0
                                    ? `${minutes}m ${seconds}s`
                                    : `${minutes}m`
                        } else {
                            value = `${seconds}s`
                        }
                    }
                } else if (col.id === 'Extra') {
                    const extra = row.original.params?.extra
                    value = extra ? JSON.stringify(extra) : ''
                } else if (col.id === 'Reserved') {
                    value = row.original.bot?.reserved ? 'True' : 'False'
                }

                rowData[header] = value as string
            })

            return rowData
        })

        // Generate filename based on date range
        let filename = 'bots_export'
        if (dateRange.startDate && dateRange.endDate) {
            const startStr = dateRange.startDate.split('T')[0]
            const endStr = dateRange.endDate.split('T')[0]
            filename +=
                startStr === endStr
                    ? `_${startStr}`
                    : `_${startStr}_to_${endStr}`
        } else {
            filename += `_${new Date().toISOString().split('T')[0]}`
        }

        downloadCSV(data, filename)
    }

    return {
        handleDownloadCSV,
        isDownloading,
    }
}
