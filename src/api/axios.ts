import axios from 'axios'
import * as rax from 'retry-axios'
import { setDefaultHeader as setDefaultHeaderMain } from '../axios_conf'

type SpokeApiConfig = {
    authorizationToken?: string
    api_server_internal_url?: string
    api_download_internal_url?: string
    defaultUrl?: string
    logError: any
    apiKey?: string
}

export function setConfig(config: SpokeApiConfig) {
    if (config.authorizationToken) {
        setDefaultHeaderMain('Authorization', config.authorizationToken)
        setDefaultHeaderMain('Accept', 'application/json')
    }

    if (config.apiKey) {
        setDefaultHeaderMain('x-meeting-baas-api-key', config.apiKey)
    }

    // Configuration des URLs
    if (config.defaultUrl) {
        configureAxios(config.defaultUrl, config.logError)
    }
    if (config.api_server_internal_url) {
        configureAxios(config.api_server_internal_url, config.logError)
    }
}

// On exporte la fonction setDefaultHeader du fichier principal
export const setDefaultHeader = setDefaultHeaderMain

// Fonction interne pour configurer axios avec retry
function configureAxios(baseUrl: string, logError: any) {
    // Configuration de retry-axios
    axios.defaults.raxConfig = {
        instance: axios,
        backoffType: 'exponential',
        retry: 1,
        noResponseRetries: 2,
        retryDelay: 100,
        httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
        statusCodesToRetry: [
            [100, 199],
            [400, 499],
            [500, 599],
        ],
        onRetryAttempt: (err: any) => {
            const cfg = rax.getConfig(err)
            const response =
                err.response && err.response.data ? err.response.data : err
            console.log(
                `Retry attempt #${cfg && cfg.currentRetryAttempt}`,
                err.request,
                response,
            )
        },
    }

    rax.attach()

    // Intercepteur de réponse
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log('[Axios_conf] ', error)
            console.log('[Axios_conf] error response :', error.response)

            if (error.response?.data?.detail) {
                if ((window as any)._env_.PREPROD === 'true') {
                    logError(JSON.stringify(error.response.data))
                } else {
                    console.error(JSON.stringify(error.response.data))
                }
            }
            return Promise.reject(error)
        },
    )
}
