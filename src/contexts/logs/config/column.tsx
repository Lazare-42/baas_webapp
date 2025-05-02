import { Center, Text } from '@chakra-ui/react'

import { getReadableError } from '../utils/error'
import { booleanSort, numberSort } from '../utils/sort'

import { CustomColumnDef } from './types'

import { BotData } from '~/api/bots/types'
import { LightningIcon, LinkArrowIcon } from '~/assets/icons'
import { BaasButtonStackSquare } from '~/components/Atoms/Buttons/BaasButtonStackSquare'

import { NAText } from '~/components/Logs/components/NAText'
import { PlatformCell } from '~/components/Logs/components/PlatformCell'
import { TableTooltip } from '~/components/Logs/components/TableTooltip'
import { WebhookCell } from '~/components/Logs/components/WebhookCell'
import { formatRelativeTime } from '../utils/date'

export const TableColumnDefs: CustomColumnDef<BotData>[] = [
    {
        header: 'Created At',
        accessorKey: 'bot.created_at',
        cell: (info) => {
            const createdAt = info.row.original.bot.created_at

            return (
                <TableTooltip
                    preview={formatRelativeTime(createdAt)}
                    data={createdAt}
                    previewProps={{ justifyContent: 'center' }}
                />
            )
        },
        minSize: 200,
        size: 220,
        enableSorting: true,
        sortingFn: 'datetime',
    },
    {
        header: 'Duration',
        accessorKey: 'duration',
        cell: (info) => {
            const duration = info.row.original.duration
            if (!duration) return <NAText />

            const hours = Math.floor(duration / 3600)
            const minutes = Math.floor((duration % 3600) / 60)
            const seconds = duration % 60

            if (hours > 0) {
                if (minutes > 0) {
                    return `${hours}h ${minutes}m`
                }
                return `${hours}h`
            }

            if (minutes > 0) {
                if (seconds > 0) {
                    return `${minutes}m ${seconds}s`
                }
                return `${minutes}m`
            }

            return `${seconds}s`
        },
        minSize: 220,
        size: 220,
        enableSorting: true,
        sortingFn: numberSort,
        meta: {
            align: 'center',
        },
    },
    {
        header: 'Bot UUID',
        accessorKey: 'bot.uuid',
        cell: (info) => (
            <TableTooltip
                preview={info.row.original.bot.uuid}
                data={info.row.original.bot.uuid}
            />
        ),
        enableSorting: true,
        minSize: 350,
        size: 350,
        sortingFn: 'alphanumeric',
    },
    {
        header: 'Platform',
        accessorKey: 'bot.meeting_url',
        cell: (info) => (
            <PlatformCell url={info.row.original.bot.meeting_url} />
        ),
        minSize: 150,
        size: 150,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        meta: {
            align: 'center',
        },
    },
    {
        header: 'Bot Name',
        accessorKey: 'params.bot_name',
        cell: (info) => info.row.original.params.bot_name,
        minSize: 150,
        size: 200,
        enableSorting: true,
        sortingFn: 'alphanumeric',
    },
    {
        header: 'Status',
        accessorFn: (row) => {
            if (row.bot.errors) {
                const { text, type } = getReadableError(row.bot.errors)
                return `${type === 'warning' ? 'Warning' : 'Error'}: ${text}`
            }
            if (row.bot.ended_at) return 'OK'
            if (row.duration > 0) return 'Recording'
            return 'Pending'
        },
        cell: (info) => {
            const bot = info.row.original.bot

            let status: { text: string; color: string; details?: string } = {
                text: 'Pending...',
                color: 'neutral.50',
            }

            if (bot.errors) {
                const { text, type } = getReadableError(bot.errors)
                status = {
                    text,
                    color: type === 'warning' ? 'warning.500' : 'error.500',
                    details: bot.errors,
                }
            } else if (bot.ended_at) {
                status = {
                    text: 'Completed',
                    color: 'primary.500',
                }
            } else if (info.row.original.duration > 0) {
                status = {
                    text: 'In Progress',
                    color: 'primary.500',
                }
            }

            return (
                <TableTooltip
                    preview={status.text}
                    data={status.details || status.text}
                    previewProps={{
                        color: status.color,
                    }}
                    dataProps={{
                        color: status.color,
                    }}
                />
            )
        },
        enableSorting: true,
        minSize: 150,
        size: 200,
        sortingFn: 'alphanumeric',
        meta: {
            originalValue:
                'Shows the full error message or status when hovering',
        },
    },
    {
        header: 'Reserved',
        accessorKey: 'bot.reserved',
        cell: (info) => (
            <Center w="full">
                {info.row.original.bot.reserved ? (
                    <LightningIcon color="primary.500" />
                ) : (
                    <LightningIcon color="primary.500" opacity={0.1} />
                )}
            </Center>
        ),
        minSize: 200,
        size: 200,
        enableSorting: true,
        sortingFn: booleanSort,
        meta: {
            align: 'center',
        },
    },
    {
        header: 'Extra',
        accessorFn: (row) => JSON.stringify(row.params.extra),
        cell: (info) => {
            const data = info.row.original.params.extra

            if (!data)
                return (
                    <Center w="full">
                        <Text color="neutral.50" fontSize="xs">
                            N/A
                        </Text>
                    </Center>
                )

            const preview = Object.entries(data)
                .slice(0, 1)
                .map(([key, value]) => {
                    const valueStr = JSON.stringify(value)
                    const fullStr = `{ ${key}: ${valueStr} }`
                    return fullStr.length > 17
                        ? fullStr.substring(0, 14) + '...'
                        : fullStr
                })
                .join(', ')

            return <TableTooltip preview={preview} data={data} />
        },
        minSize: 150,
        size: 200,
        enableSorting: true,
        sortingFn: 'alphanumeric',
        meta: {
            originalValue: 'Shows the complete extra data object when hovering',
        },
    },
    {
        header: 'retry',
        accessorKey: 'retry' as keyof BotData,
        cell: (info) => {
            return <WebhookCell info={info} />  
        },
        minSize: 100,
        size: 100,
        enableSorting: false,
        meta: {
            align: 'center',
        },
    },
    {
        header: 'recording',
        accessorKey: 'recording',
        cell: (info) => {
            const duration = info.row.original.duration
            if (duration > 0) {
                return (
                    <BaasButtonStackSquare
                        onClick={() => {
                            const botId = info.row.original.bot.uuid
                            const url = `/viewer/${botId}`
                            window.open(url)
                        }}
                        squareButton={true}
                        icon={<LinkArrowIcon />}
                        aria-label={'open-recording'}
                    />
                )
            } else {
                return <NAText />
            }
        },
        minSize: 100,
        size: 100,
        enableSorting: true,
        sortingFn: numberSort,
        meta: {
            align: 'center',
        },
    },
]
