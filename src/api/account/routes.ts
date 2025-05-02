import axios from 'axios'
import {
    AccountInfos,
    ApiKeyResponse,
    LoginParams,
    LoginResponse,
} from './type'

// TODO: remove?
export async function resendEmail(email: string, search: string) {
    await axios.post(`/accounts/resend_mail${search}`, {
        email: email,
        special_code: null,
    })
}

export async function getWebhookUrl() {
    const response = await axios.get(`/accounts/webhook_url`)
    // Assurez-vous de renvoyer simplement la chaîne de l'URL
    return response.data.webhook_url || '' // Renvoyez une chaîne vide si pas d'URL
}

export async function apiSetWebhookUrl(webhook_url: string) {
    await axios.post(`/accounts/webhook_url`, {
        webhook_url: webhook_url,
    })
}

export async function resetPassword(
    token: string,
    data: { email: string; password: string },
) {
    await axios.post(`accounts/reset_password/${token}`, data)
}

export async function changePassword(data: {
    new_password: string
    old_password: string
}) {
    await axios.post('/accounts/change_password/', data)
}

export async function changeEmail(data: {
    new_email: string
    password: string
}) {
    await axios.post('/accounts/change_email/', data)
}

export async function checkPassword(password: string) {
    await axios.post('/accounts/check_password', { password })
}

export async function getAccountInfos(): Promise<AccountInfos> {
    return (await axios.get(`accounts/infos`)).data
}

export async function sendResetPasswordLink(email: string): Promise<void> {
    return await axios.post('/accounts/send-reset-password-link/', {
        email: email,
    })
}

export async function logoutApi() {
    await axios.post('/accounts/logout/', {})
}

export async function loginApi(
    data: LoginParams,
    search?: string,
): Promise<LoginResponse> {
    return (
        await axios.post(`/accounts/login${search != null ? search : ''}`, data)
    ).data
}

export async function fetchApiKey(): Promise<ApiKeyResponse> {
    return (await axios.get('/accounts/api_key')).data
}

export async function signupApi(
    data: {
        email: string
        lang?: string
        google_token_id?: string
    },
    search?: string,
): Promise<{ token: string }> {
    return (
        await axios.post(
            `/accounts/getstarted${search != null ? search : ''}`,
            data,
        )
    ).data
}

export async function checkJwt(): Promise<void> {
    return (await axios.get(`/accounts/check_jwt`)).data
}
