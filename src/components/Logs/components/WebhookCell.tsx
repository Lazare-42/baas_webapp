import { Box, Center, Tooltip, useToast } from '@chakra-ui/react'
import { CellContext } from '@tanstack/react-table'
import React from 'react'

import { retryWebhook } from '~/api/bots/routes'
import { BotData } from '~/api/bots/types'
import { SynchronizationIcon } from '~/assets/icons'
import { BaasButtonStackSquare } from '../../Atoms/Buttons/BaasButtonStackSquare'
import { NAText } from '../components/NAText'

export const WebhookCell = ({
    info,
}: {
    info: CellContext<BotData, unknown>
}) => {
    const [loading, setLoading] = React.useState(false)
    const toast = useToast()
    const handleRetry = async () => {
        try {
            setLoading(true)
            await retryWebhook(info.row.original.bot.uuid)
            toast({
                title: "Success",
                description: "Retry successful",
                status: "success",
            })
        } catch {
            toast({
                title: "Error",
                description: "Retry webhook failed",
                status: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const canRetry = info.row.original.bot.ended_at

    if (!canRetry) {
        return (
            <Center w="full">
                <NAText />
            </Center>
        )
    }

    return (
        <Center w="full">
            <Tooltip label={'Resend Final Webhook'} placement="top">
                <Box position="relative">
                    <BaasButtonStackSquare
                        icon={<SynchronizationIcon />}
                        aria-label="Resend Final Webhook"
                        onClick={handleRetry}
                        isLoading={loading}
                        squareButton={true}
                    />
                </Box>
            </Tooltip>
        </Center>
    )
}
