import axios from 'axios'
import {
    AccountInfos,
    ApiKeyResponse,
    LoginParams,
    LoginResponse,
    Session,
} from './type'
import { getAuthAppUrl } from '~/utils/authAppUrl'

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

export async function getAccountInfos(): Promise<AccountInfos> {
    return (await axios.get(`accounts/infos`)).data
}

export async function logoutApi() {
    const authAppUrl = getAuthAppUrl()

    await axios.post(`${authAppUrl}/api/auth/sign-out`, {})
}

export async function fetchApiKey(): Promise<ApiKeyResponse> {
    return (await axios.get('/accounts/api_key')).data
}

export async function checkJwt(): Promise<void> {
    return (await axios.get(`/accounts/check_jwt`)).data
}

export async function getAuthSession(): Promise<Session> {
    const authAppUrl = getAuthAppUrl()

    const response = await axios.get(`${authAppUrl}/api/auth/get-session`)

    if (!response?.data?.session) {
        throw new Error('Session not found')
    }

    const session = response.data.session
    return session as Session
}
