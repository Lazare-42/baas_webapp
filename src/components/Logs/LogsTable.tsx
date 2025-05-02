import {
    ColumnOrderState,
    ColumnSizingState,
    OnChangeFn,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useMemo, useRef } from 'react'
import { useLogs } from '~/contexts/logs/LogsContext'
import { TableLayout } from './TableLayout'

export const LogsTable = () => {
    const {
        tableState,
        setTableState,
        searchValue,
        bots,
        isLoading,
        handleLoadMore,
        setIsLoading,
    } = useLogs()

    const tableContainerRef = useRef<HTMLDivElement>(null)

    const tableConfig = useMemo(
        () => ({
            data: bots,
            columns: tableState.columns,
            state: {
                sorting: tableState.sorting,
                columnOrder: tableState.columnOrder,
                columnSizing: tableState.columnSizing,
                columnVisibility: tableState.columnVisibility,
                globalFilter: searchValue,
            },
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
        }),
        [bots, tableState, searchValue],
    )

    const tableHandlers = useMemo(
        () => ({
            onColumnSizingChange: ((updaterOrValue) => {
                const newValue =
                    typeof updaterOrValue === 'function'
                        ? updaterOrValue(tableState.columnSizing)
                        : updaterOrValue
                setTableState((prev) => ({
                    ...prev,
                    columnSizing: newValue,
                }))
            }) as OnChangeFn<ColumnSizingState>,
            onSortingChange: ((updaterOrValue) => {
                // Activer le loading immédiatement
                setIsLoading(true)

                const newValue =
                    typeof updaterOrValue === 'function'
                        ? updaterOrValue(tableState.sorting)
                        : updaterOrValue

                setTableState((prev) => ({
                    ...prev,
                    sorting: newValue,
                }))

                // Utiliser requestAnimationFrame pour le prochain frame de rendu
                requestAnimationFrame(() => {
                    setIsLoading(false)
                })

                return newValue
            }) as OnChangeFn<SortingState>,
            onColumnOrderChange: ((updaterOrValue) => {
                const newValue =
                    typeof updaterOrValue === 'function'
                        ? updaterOrValue(tableState.columnOrder)
                        : updaterOrValue
                setTableState((prev) => ({
                    ...prev,
                    columnOrder: newValue,
                }))
            }) as OnChangeFn<ColumnOrderState>,

            onColumnVisibilityChange: ((updaterOrValue) => {
                const newValue =
                    typeof updaterOrValue === 'function'
                        ? updaterOrValue(tableState.columnVisibility)
                        : updaterOrValue
                setTableState((prev) => ({
                    ...prev,
                    columnVisibility: newValue,
                }))
            }) as OnChangeFn<VisibilityState>,
        }),
        [setTableState, setIsLoading, tableState],
    )

    const table = useReactTable({
        ...tableConfig,
        ...tableHandlers,
    })

    const { rows } = table.getRowModel()

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: useCallback(() => 33, []),
        getScrollElement: useCallback(() => tableContainerRef.current, []),
        overscan: 20,
    })

    const handleTableScroll = useCallback(
        (element: HTMLDivElement) => {
            const { scrollHeight, scrollTop, clientHeight } = element
            if (scrollHeight - scrollTop - clientHeight < 500 && !isLoading) {
                handleLoadMore()
            }
        },
        [isLoading, handleLoadMore],
    )

    return (
        <TableLayout
            table={table}
            rowVirtualizer={rowVirtualizer}
            containerRef={tableContainerRef}
            onScroll={handleTableScroll}
        />
    )
}
