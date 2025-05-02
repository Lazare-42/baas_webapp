import { TokenConsumptionByService } from '~/api/consumption/types'

export type TransformedChartData = TokenConsumptionByService & {
    total_tokens: number
    name: string
    isValid: boolean
    date: Date
}
