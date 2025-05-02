// api/bot/types.ts
export interface Bot {
    id: number
    account_id: number
    meeting_url: string
    created_at: string
    session_id: string | null
    reserved: boolean
    errors: string | null
    ended_at: string | null
    uuid: string
}

interface BotParams {
    id: number
    bot_name: string
    bot_image: string | null
    speech_to_text: {
        provider: string | null
        api_key: string | null
    }
    enter_message: string | null
    extra: JSON
}

export interface BotData {
    bot: Bot
    params: BotParams
    duration: number
    transcripts: Transcript[]
}

export interface BotPaginated {
    has_more: boolean
    bots: BotData[]
}

export interface BotQueryParams {
    offset?: number
    limit?: number
    start_date?: string
    end_date?: string
    bot_id?: string
}
export type Transcript = {
    speaker: string
    words: {
        start_time: number
        end_time: number
        text: string
    }[]
}
