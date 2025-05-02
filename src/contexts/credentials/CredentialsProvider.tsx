import { useEffect, useState } from 'react'
import {
    apiSetWebhookUrl,
    fetchApiKey,
    getWebhookUrl,
} from '~/api/account/routes'
import { CredentialsContext } from './CredentialsContext'

export const CredentialsProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [webhookUrl, setWebhookUrl] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCredentials = async () => {
            try {
                const apiKeyRes = await fetchApiKey()
                setApiKey(apiKeyRes?.api_key ?? null)

                const webhookUrlRes = await getWebhookUrl()
                setWebhookUrl(webhookUrlRes)

                setIsLoading(false)
            } catch (error) {
                console.error('Failed to fetch credentials', error)
                setIsLoading(false)
            }
        }

        fetchCredentials()
    }, [])

    useEffect(() => {
        // Ne faites rien si c'est le chargement initial ou si l'URL est vide
        if (isLoading || webhookUrl === '') return

        const updateWebhookUrl = async () => {
            try {
                await apiSetWebhookUrl(webhookUrl)
            } catch (error) {
                console.error('Failed to update webhook URL', error)
                // Optionnel : gérer l'erreur (peut-être réinitialiser l'URL?)
            }
        }

        updateWebhookUrl()
    }, [webhookUrl, isLoading])

    if (isLoading) {
        return null // ou un composant de chargement
    }

    return (
        <CredentialsContext.Provider
            value={{ apiKey, webhookUrl, setWebhookUrl }}
        >
            {children}
        </CredentialsContext.Provider>
    )
}
