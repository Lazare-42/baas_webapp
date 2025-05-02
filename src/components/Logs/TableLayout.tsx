// components/LogsTable/TableLayout.tsx
import {
    Box,
    Button,
    Flex,
    TabPanels,
    Table,
    Tabs,
    Tbody,
    Th,
    Thead,
    Tooltip,
    Tr,
    VStack,
    useDisclosure,
} from '@chakra-ui/react'
import { Row, useReactTable } from '@tanstack/react-table'
import { Virtualizer } from '@tanstack/react-virtual'

import { DownloadIcon } from '~/assets/icons'
import { useLogs } from '~/contexts/logs'
import { CSVDownloadModal } from './components/CSVDownloadModal'

import { BotData } from '~/api/bots/types'
import { useTableCSV } from '~/hooks/logs/useTableCSV'

import { DateFilter } from './DateFilter'
import { LogsSearch } from './LogsSearch'
import { ColumnHeader } from './components/ColumnHeader'
import { FilterButton } from './components/FilterButton'
import { FilteredCountText } from './components/FilteredCountText'
import { LoadMoreButton } from './components/LoadMoreButton'
import { TableCell } from './components/TableCell'

interface TableLayoutProps {
    table: ReturnType<typeof useReactTable<BotData>>
    rowVirtualizer: Virtualizer<HTMLDivElement, Element>
    containerRef: React.RefObject<HTMLDivElement>
    onScroll: (element: HTMLDivElement) => void
}

export const TableLayout: React.FC<TableLayoutProps> = ({
    table,
    rowVirtualizer,
    containerRef,
    onScroll,
}) => {
    const { dateRange, hasMore, isLoading, handleLoadMore } = useLogs()

    const {
        isOpen: isDownloadOpen,
        onOpen: onDownloadOpen,
        onClose: onDownloadClose,
    } = useDisclosure()

    const { handleDownloadCSV } = useTableCSV(table, dateRange)
    const { rows } = table.getRowModel()
    const filteredCount = table.getFilteredRowModel().rows.length

    return (
        <Flex
            rounded="md"
            overflow="clip"
            h="full"
            maxW="full"
            maxH="full"
            flexDir="column"
            w="full"
            position="relative"
        >
            <Tabs
                fontFamily="baasBody"
                gap="4"
                display="flex"
                h="full"
                minH="full"
                maxW="full"
                flexDir="column"
                variant="unstyled"
            >
                <Flex w="full" direction="column" gap={2}>
                    <VStack align="flex-end">
                        <Flex w="full" justify="space-between">
                            {/* Left side controls */}
                            <Flex
                                align="center"
                                gap="2"
                                rounded="lg"
                                w="fit-content"
                                p="1"
                                bg="neutral.900"
                            >
                                <LogsSearch />
                                <FilterButton table={table} />
                                <LoadMoreButton />
                            </Flex>

                            {/* Right side controls */}
                            <Flex
                                gap="2"
                                rounded="lg"
                                w="fit-content"
                                p="1"
                                bg="neutral.900"
                            >
                                <DateFilter />
                                <Tooltip label="Export CSV">
                                    <Button
                                        variant="chartType"
                                        isActive={true}
                                        onClick={onDownloadOpen}
                                    >
                                        <DownloadIcon />
                                    </Button>
                                </Tooltip>
                            </Flex>
                        </Flex>

                        <FilteredCountText
                            count={filteredCount}
                            hasMoreRows={hasMore}
                        />
                    </VStack>

                    {/* Table Container */}
                    <Box flex={1} overflow="hidden">
                        <TabPanels
                            display="flex"
                            flexGrow={1}
                            w="full"
                            maxW="full"
                            rounded="lg"
                            overflow="scroll"
                            onScroll={(e) =>
                                onScroll(e.target as HTMLDivElement)
                            }
                            ref={containerRef}
                            sx={{
                                '::-webkit-scrollbar': {
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'transparent',
                                },
                                '::-webkit-scrollbar-track': {
                                    backgroundColor: 'transparent',
                                },
                                '::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'neutral.400',
                                    borderRadius: '20px',
                                    border: '2px solid transparent',
                                },
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'neutral.400 transparent',
                            }}
                        >
                            <Table
                                display="grid"
                                color="neutral.500"
                                h="fit-content"
                                size="sm"
                                style={{
                                    width: '100%',
                                    minWidth: table.getTotalSize(),
                                }}
                            >
                                {/* Table Header */}
                                <Thead
                                    w="full"
                                    h="40px"
                                    display="grid"
                                    position="sticky"
                                    top="0"
                                    zIndex="2"
                                    bg="primary.700"
                                    borderColor="neutral.700"
                                    style={{
                                        width: '100%',
                                        minWidth: table.getTotalSize(),
                                    }}
                                >
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <Tr
                                                key={headerGroup.id}
                                                display="flex"
                                                w="full"
                                                h="full"
                                                style={{
                                                    width: '100%',
                                                    minWidth:
                                                        table.getTotalSize(),
                                                }}
                                            >
                                                {headerGroup.headers.map(
                                                    (header, index) => (
                                                        <Th
                                                            p="0"
                                                            key={header.id}
                                                            draggable={true}
                                                            border="none"
                                                            borderRight={
                                                                index <
                                                                headerGroup
                                                                    .headers
                                                                    .length -
                                                                    1
                                                                    ? '1px solid'
                                                                    : 'none'
                                                            }
                                                            borderColor="neutral.700"
                                                            h="full"
                                                            style={{
                                                                width: header.getSize(),
                                                                minWidth:
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .minSize,
                                                                padding:
                                                                    header
                                                                        .column
                                                                        .columnDef
                                                                        .size ===
                                                                    40
                                                                        ? 0
                                                                        : undefined,
                                                            }}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                        >
                                                            <ColumnHeader
                                                                header={header}
                                                            />
                                                        </Th>
                                                    ),
                                                )}
                                            </Tr>
                                        ))}
                                </Thead>

                                {/* Table Body */}
                                <Tbody
                                    h="100vh"
                                    position="relative"
                                    display="grid"
                                    w="full"
                                    style={{
                                        width: '100%',
                                        minWidth: table.getTotalSize(),
                                    }}
                                >
                                    {rowVirtualizer
                                        .getVirtualItems()
                                        .map((virtualRow) => {
                                            const row = rows[
                                                virtualRow.index
                                            ] as Row<BotData>
                                            return (
                                                <Tr
                                                    data-index={
                                                        virtualRow.index
                                                    }
                                                    ref={(node) =>
                                                        rowVirtualizer.measureElement(
                                                            node,
                                                        )
                                                    }
                                                    key={row.id}
                                                    position="absolute"
                                                    transform={`translateY(${virtualRow.start}px)`}
                                                    display="flex"
                                                    border="none"
                                                    w="full"
                                                    bg={
                                                        virtualRow.index % 2 ===
                                                        0
                                                            ? 'neutral.900'
                                                            : 'neutral.500'
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        minWidth:
                                                            table.getTotalSize(),
                                                        flex: 1,
                                                    }}
                                                >
                                                    {row
                                                        .getVisibleCells()
                                                        .map((cell, index) => (
                                                            <TableCell
                                                                key={cell.id}
                                                                cell={cell}
                                                                isLastCell={
                                                                    index ===
                                                                    row.getVisibleCells()
                                                                        .length -
                                                                        1
                                                                }
                                                            />
                                                        ))}
                                                </Tr>
                                            )
                                        })}
                                </Tbody>
                            </Table>
                        </TabPanels>
                    </Box>
                </Flex>
            </Tabs>

            <CSVDownloadModal
                isOpen={isDownloadOpen}
                onClose={onDownloadClose}
                hasMoreRows={hasMore}
                onDownload={handleDownloadCSV}
            />
        </Flex>
    )
}
