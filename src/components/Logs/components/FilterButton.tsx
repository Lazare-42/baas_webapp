import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Button,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import { Column, Table } from '@tanstack/react-table'

import { BotData } from '~/api/bots/types'
import { FilterIcon } from '~/assets/icons'

interface FilterButtonProps {
    table: Table<BotData>
}

export const FilterButton = ({ table }: FilterButtonProps) => (
    <Menu closeOnSelect={false}>
        <MenuButton
            as={Button}
            alignItems="center"
            fontSize={{ base: 'sm', lg: 'md' }}
            fontFamily="baasBody"
            fontWeight="regular"
            variant="unstyled"
            bg="neutral.500"
            px={{ base: '2', lg: '4' }}
            py={{ base: '1', lg: '2' }}
            color="primary.500"
            rounded="lg"
            _hover={{ bg: 'primary.700' }}
        >
            <Flex gap={2} display={{ base: 'none', lg: 'flex' }}>
                <Text>Filter</Text>
                <ChevronDownIcon h="full" alignItems="center" />
            </Flex>
            <FilterIcon display={{ base: 'flex', lg: 'none' }} />
        </MenuButton>
        <MenuList border="1px solid" borderColor="neutral.500">
            <MenuItem
                key="toggle"
                onClick={(e) => {
                    e.preventDefault()
                    table.toggleAllColumnsVisible() // Changé ici
                }}
            >
                <Checkbox
                    variant="baas"
                    isChecked={table.getIsAllColumnsVisible()}
                    onChange={(e) => e.stopPropagation()}
                />
                <>Toggle All</>
            </MenuItem>
            {table.getAllLeafColumns().map((column: Column<BotData>) => (
                <MenuItem
                    key={column.id}
                    onClick={(e) => {
                        e.preventDefault()
                        column.toggleVisibility()
                    }}
                >
                    <Checkbox
                        variant="baas"
                        isChecked={column.getIsVisible()}
                        onChange={(e) => e.stopPropagation()}
                    />
                    {typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : 'Column'}
                </MenuItem>
            ))}
        </MenuList>
    </Menu>
)
