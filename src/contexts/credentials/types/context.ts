export type CredentialsContextType = {
    apiKey: string | null
    webhookUrl: string
    setWebhookUrl: (url: string) => void
}
