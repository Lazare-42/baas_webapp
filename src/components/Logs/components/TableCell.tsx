import { Center, Td } from '@chakra-ui/react'
import { Cell, flexRender } from '@tanstack/react-table'
import { BotData } from '~/api/bots/types'

interface TableCellProps {
    cell: Cell<BotData, unknown>
    isLastCell: boolean
}

export const TableCell = ({ cell, isLastCell }: TableCellProps) => (
    <Td
        border="none"
        borderRight={isLastCell ? 'none' : '1px solid'}
        borderColor="neutral.700"
        fontSize="xs"
        display="flex"
        color="neutral.50"
        minH="40px"
        data-column-id={cell.column.id}
        style={{
            width: cell.column.getSize(),
            minWidth: cell.column.columnDef.minSize,
            maxWidth: cell.column.columnDef.size,
            backgroundColor: 'inherit',
        }}
    >
        <Center
            w="full"
            h="full"
            px={3}
            py={2}
            justifyContent={
                cell.column.columnDef.meta?.align === 'center'
                    ? 'center'
                    : 'flex-start'
            }
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Center>
    </Td>
)
