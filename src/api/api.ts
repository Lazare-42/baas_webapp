import axios from 'axios'

export async function testFailRequest(user_token: string, payload: any) {
    return (
        await axios({
            method: 'GET',
            url: `/error`,
            data: payload,
            headers: {
                Authorization: user_token,
            },
        })
    ).data
}

export async function notify(user_token: string, payload: any) {
    return (
        await axios({
            method: 'POST',
            url: `/notification/broadcast`,
            data: payload,
            headers: {
                Authorization: user_token,
            },
        })
    ).data
}

//todo: fix those types for the viewer or remove them when transcript seeker will be implemented
type Bot = {
    id: number
    account_id: number
    meeting_url: string
    bot_name: string
    bot_image: string | null
    speech_to_text: {
        provider: string | null
        api_key: string | null
    }
    streaming_input: string | null
    streaming_output: string | null
    created_at: number
    session_id: string | null
    extra: string
    reserved: boolean
    errors: string | null
    ended_at: number | null
    enter_message: string | null
    mp4_s3_path: string
    webhook_url: string
    uuid: string
    recording_mode: string
}
type BotData = {
    bot: Bot | null
    transcripts: Transcript[]
}

type Transcript = {
    speaker: string
    words: {
        start_time: number
        end_time: number
        text: string
    }[]
}

export type MeetingInfo =
    | {
          name: string
          bot_data: BotData
          mp4: string
      }
    | undefined
