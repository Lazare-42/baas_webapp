import '@tanstack/react-table'
import { ColumnDef, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'left' | 'center' | 'right'
        originalValue?: string
    }
}

interface CustomColumnMeta {
    align?: 'left' | 'center' | 'right'
    originalValue?: string
}

export type CustomColumnDef<T> = ColumnDef<T> & {
    meta?: CustomColumnMeta
    minSize: number
    size: number
    maxSize?: number
}
