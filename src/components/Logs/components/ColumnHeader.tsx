import { ViewIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Text, Tooltip } from '@chakra-ui/react'
import { flexRender, Header } from '@tanstack/react-table'
import { memo } from 'react'
import { BotData } from '~/api/bots/types'
import { SortColumn } from './SortColumn'

interface ColumnHeaderProps {
    header: Header<BotData, unknown>
}

export const ColumnHeader = memo(({ header }: ColumnHeaderProps) => {
    const headerContent = flexRender(
        header.column.columnDef.header,
        header.getContext(),
    )
    const originalValue = header.column.columnDef.meta?.originalValue
    return (
        <Center
            justifyContent="space-between"
            overflow="hidden"
            h="full"
            px={3}
            style={{
                width: header.column.getSize(),
                minWidth: header.column.columnDef.minSize,
                maxWidth: header.column.columnDef.size,
            }}
        >
            <Box w="44px" h="20px" />
            <Tooltip
                label={originalValue || headerContent}
                placement="top"
                hasArrow
                isDisabled={!originalValue}
            >
                <Text
                    color="neutral.50"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    textAlign="center"
                >
                    {headerContent}
                </Text>
            </Tooltip>
            <Flex
                align="center"
                w="44px"
                h="full"
                justify="space-between"
                gap={1}
            >
                <Center w="22px" h="full" _hover={{ opacity: 1 }}>
                    {header.column.getCanSort() && (
                        <Box display="flex">
                            <SortColumn header={header} />
                        </Box>
                    )}
                </Center>
                <Tooltip label="Hide column" placement="top">
                    <ViewIcon
                        h="full"
                        w="16px"
                        color="neutral.50"
                        opacity={0.6}
                        _hover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                        cursor="pointer"
                        onClick={(e) => {
                            e.stopPropagation()
                            header.column.toggleVisibility()
                        }}
                    />
                </Tooltip>
            </Flex>
        </Center>
    )
})
