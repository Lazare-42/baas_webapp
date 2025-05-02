import { useState } from 'react'
import { TableColumnDefs } from '~/contexts/logs/config/column'
import { viewsConfig } from '~/contexts/logs/config/view'

import { TableState } from '~/contexts/logs/types/table'

export function useLogsTable() {
    const [tableState, setTableState] = useState<TableState>({
        columns: TableColumnDefs,
        columnOrder: Object.entries(viewsConfig.general)
            .filter(([, isVisible]) => isVisible)
            .map(([header]) => header),
        columnSizing: {},
        sorting: [],
        columnVisibility: viewsConfig.general,
    })

    return { tableState, setTableState }
}
