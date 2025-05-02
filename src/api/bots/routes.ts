import axios from 'axios'
import { format } from 'date-fns'
import { Bot, BotPaginated, BotQueryParams } from './types'

export async function fetchBots(params: BotQueryParams): Promise<BotPaginated> {
    try {
        const formattedParams = {
            offset: params.offset,
            limit: params.limit,
            ...(params.start_date && {
                start_date: `${format(
                    new Date(params.start_date),
                    'yyyy-MM-dd',
                )}T00:00:00`,
            }),
            ...(params.end_date && {
                end_date: `${format(
                    new Date(params.end_date),
                    'yyyy-MM-dd',
                )}T23:59:59`,
            }),
            ...(params.bot_id && { bot_id: params.bot_id }),
        }

        const response = await axios.get('/bots/all', {
            params: formattedParams,
        })
        return response.data
    } catch (error) {
        console.error('Full error details:', error)
        throw error
    }
}

export async function fetchAllBots(params: {
    offset: number
    limit: number
    start_date?: string
    end_date?: string
    bot_id?: string
}): Promise<BotPaginated> {
    return (await axios(`/bots/all`, { params })).data
}

export async function fetchBot(bot_uuid: string): Promise<Bot> {
    return (await axios(`/bots/${bot_uuid}`)).data
}

export async function retryWebhook(bot_uuid: string): Promise<void> {
    return (
        await axios({
            method: 'POST',
            url: `/bots/retry_webhook?bot_uuid=${bot_uuid}`,
        })
    ).data
}
