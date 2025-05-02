import { Box, Tooltip, VStack } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '~/assets/icons'

export const SortColumn = ({ header }: { header: any }) => {
    const sortedState = header.column.getIsSorted()

    const handleSort = (e: React.MouseEvent, ascending: boolean) => {
        e.stopPropagation()
        header.column.toggleSorting(!ascending)
    }

    return (
        <VStack spacing={0} cursor="pointer" gap={0}>
            <Tooltip label="Sort ascending" placement="top" hasArrow>
                <Box>
                    <ChevronUpIcon
                        h="12px"
                        w="12px"
                        display="flex"
                        color="neutral.50"
                        opacity={sortedState === 'asc' ? 1 : 0.5}
                        onClick={(e) => handleSort(e, true)}
                        _hover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                    />
                </Box>
            </Tooltip>
            <Tooltip label="Sort descending" placement="bottom" hasArrow>
                <Box>
                    <ChevronDownIcon
                        h="12px"
                        onClick={(e) => handleSort(e, false)}
                        _hover={{ opacity: 1 }}
                        color="neutral.50"
                        opacity={sortedState === 'desc' ? 1 : 0.5}
                        transition="opacity 0.2s"
                    />
                </Box>
            </Tooltip>
        </VStack>
    )
}
