import { SortingFn } from '@tanstack/react-table'
import { BotData } from '~/api/bots/types'

export const booleanSort: SortingFn<BotData> = (rowA, rowB) => {
    const a = rowA.original.bot.reserved
    const b = rowB.original.bot.reserved
    return a === b ? 0 : a ? 1 : -1
}

export const numberSort: SortingFn<BotData> = (rowA, rowB) => {
    const a = rowA.original.duration || 0
    const b = rowB.original.duration || 0
    return a === b ? 0 : a > b ? 1 : -1
}
