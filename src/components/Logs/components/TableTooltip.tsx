import {
    Center,
    Flex,
    FlexProps,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Portal,
    Text,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { CopyButton } from '../../Atoms/Buttons/CopyButton'

export const TableTooltip = ({
    preview,
    data,
    dataProps,
    previewProps,
}: {
    preview: ReactNode | string
    data: string | object
    dataProps?: FlexProps // due to the portal we need to use flex props like this
    previewProps?: FlexProps
}) => {
    const formattedData =
        typeof data === 'string' ? data : JSON.stringify(data, null, 2)

    return (
        <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
                <Flex
                    w="full"
                    cursor="pointer"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    {...previewProps}
                >
                    <Text
                        fontSize="xs"
                        fontFamily="monospace"
                        transition="opacity 0.2s"
                    >
                        {preview}
                    </Text>
                </Flex>
            </PopoverTrigger>
            <Portal>
                <PopoverContent
                    border="none"
                    bg="transparent"
                    w="fit-content"
                    minW="180px"
                    maxW="500px"
                    fontSize="xs"
                >
                    <Center
                        bg="neutral.700"
                        boxShadow="lg"
                        p={4}
                        rounded="2xl"
                        border="1px solid"
                        borderColor="neutral.500"
                        maxW="full"
                        fontSize="md"
                        justifyContent="space-between"
                        color="neutral.50"
                        gap={2}
                        {...dataProps}
                    >
                        <Flex
                            fontSize="sm"
                            whiteSpace="pre-wrap"
                            wordBreak="break-word"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            maxW="100%"
                            flex="1"
                            fontFamily="monospace"
                        >
                            {formattedData}
                        </Flex>
                        <CopyButton
                            size="sm"
                            alignSelf={'top'}
                            contentTocopy={formattedData}
                        />
                    </Center>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}
