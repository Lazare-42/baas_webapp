import {
    ColumnOrderState,
    ColumnSizingState,
    SortingState,
    VisibilityState,
} from '@tanstack/react-table'

import { BotData } from '~/api/bots/types'
import { CustomColumnDef } from '../config/types'

export interface TableState {
    columns: CustomColumnDef<BotData>[]
    columnOrder: ColumnOrderState
    columnSizing: ColumnSizingState
    sorting: SortingState
    columnVisibility: VisibilityState
}
