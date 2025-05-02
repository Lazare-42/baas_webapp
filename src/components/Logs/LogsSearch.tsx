// components/LogsTable/LogsSearch.tsx
import { SearchIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Flex,
    Input,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useLogs } from '~/contexts/logs/LogsContext'
import { useKeyboardShortcut } from '~/hooks/useKeyboardShortcut'

export const LogsSearch = () => {
    const {
        searchValue,
        setSearchValue,
        searchResults,
        handleLoadMore,
        hasMore,
    } = useLogs()

    const inputRef = useRef<HTMLInputElement>(null)

    // Utilisation du hook pour le raccourci clavier
    useKeyboardShortcut(
        {
            key: 'k',
            ctrlKey: true,
            metaKey: true,
            preventDefault: true,
        },
        () => {
            inputRef.current?.focus()
        },
    )

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && hasMore) {
            handleLoadMore()
        }
        if (e.key === 'Escape') {
            inputRef.current?.blur()
            setSearchValue('')
        }
    }

    return (
        <Popover
            isOpen={!!searchValue}
            autoFocus={false}
            matchWidth
            placement="bottom-start"
        >
            <PopoverTrigger>
                <Flex
                    gap={2}
                    align="center"
                    bg="neutral.500"
                    px={4}
                    rounded="lg"
                    h="40px"
                    _hover={{ bg: 'primary.700' }}
                >
                    <SearchIcon color="primary.500" boxSize={4} />
                    <Flex flex={1} position="relative">
                        <Input
                            ref={inputRef}
                            value={searchValue}
                            placeholder="Search (⌘K)"
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            bg="transparent"
                            border="none"
                            color="primary.500"
                            _hover={{ borderColor: 'none' }}
                            _focus={{
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                            size="sm"
                            fontFamily="baasBody"
                            p={0}
                            w={{ base: 'full', md: '300px' }}
                            _placeholder={{ color: 'primary.500' }}
                        />
                        {searchValue && (
                            <Button
                                variant="borderless"
                                w="fit-content"
                                isActive={true}
                                size="sm"
                                onClick={() => setSearchValue('')}
                            >
                                Clear
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </PopoverTrigger>

            <PopoverContent
                bg="neutral.900"
                borderColor="neutral.500"
                width="300px"
            >
                <PopoverBody p={2}>
                    <Flex direction="column" gap={2}>
                        <Box>
                            <Text
                                color="primary.500"
                                fontSize="xs"
                                fontWeight="medium"
                                mb={1}
                            >
                                Bot IDs
                            </Text>
                            {searchResults.botResults.length > 0 ? (
                                searchResults.botResults.map((result, i) => (
                                    <Box
                                        key={i}
                                        p={2}
                                        _hover={{
                                            bg: 'primary.700',
                                            color: 'neutral.900',
                                        }}
                                        color="primary.700"
                                        cursor="pointer"
                                        onClick={() =>
                                            setSearchValue(result.id)
                                        }
                                    >
                                        <Text
                                            color="neutral.50"
                                            transition="color 0.2s"
                                        >
                                            {result.name}
                                        </Text>
                                        <Text fontSize="xs">{result.id}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Text color="neutral.400" fontSize="sm" p={2}>
                                    No bot ID matches
                                </Text>
                            )}
                        </Box>

                        <Box>
                            <Text
                                color="primary.500"
                                fontSize="xs"
                                fontWeight="medium"
                                mb={1}
                            >
                                Content Matches
                            </Text>
                            {searchResults.contentResults.length > 0 ? (
                                searchResults.contentResults.map(
                                    (result, i) => (
                                        <Box
                                            key={i}
                                            p={2}
                                            _hover={{
                                                bg: 'primary.700',
                                                color: 'neutral.900',
                                            }}
                                            cursor="pointer"
                                            color="primary.700"
                                            onClick={() =>
                                                setSearchValue(result.id)
                                            }
                                        >
                                            <Text
                                                color="neutral.50"
                                                fontSize="sm"
                                            >
                                                {result.match}
                                            </Text>
                                            <Text fontSize="xs">
                                                ID: {result.id}
                                            </Text>
                                        </Box>
                                    ),
                                )
                            ) : (
                                <Text color="neutral.400" fontSize="sm" p={2}>
                                    No content matches
                                </Text>
                            )}
                        </Box>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
