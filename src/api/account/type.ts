export type AccountInfos = {
    account: Account
}

export type Account = {
    id: number
    status: number
    email: string
    user_role: string
    master_id?: number
    transcription_lang?: string
    referral_activated: boolean
    tacos_rating?: number
    has_referred_friend: boolean
    firstname: string
    tutorial_seen_count: number
    current_workspace_id?: number
    current_category_id: number | null
    number_spoke: number
    created_at: { secs_since_epoch: number }
    default_workspace_id?: number
    default_agenda_id?: number
    has_download_app: boolean
    email_on_new_spoke: boolean
    has_installed_extension: boolean
    email_on_bot_failed: boolean
    company_name?: string
    phone?: string
    lastname: string
}

export interface ApiKeyResponse {
    api_key: string
}

export type LoginParams = {
    pseudo: string
    password: string
    google_chrome_token_id?: string
    google_token_id?: string
    microsoft_token_id?: string
    app_signin_token?: string
}

export type LoginResponse = {
    token: string
    email: string
    has_baas_api_key: boolean
}

export type RegisterParams = {
    email: string
    google_token_id?: string
    microsoft_token_id?: string
    redirect_url?: string
    app_signin_token?: string
}
