export interface UserTokensResponse {
    available_tokens: number
    total_tokens_purchased: number
    last_purchase_date: string | null
}

export interface TokenConsumptionByService {
    duration: number
    recording_tokens: number
    transcription_tokens: number
    transcription_hour: number
    transcription_byok_tokens: number
    transcription_byok_hour: number
    streaming_output_tokens: number
    streaming_output_hour: number
    streaming_input_tokens: number
    streaming_input_hour: number
}

export interface DailyTokenConsumption {
    date: string
    consumption_by_service: TokenConsumptionByService
}
