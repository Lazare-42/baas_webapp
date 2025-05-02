import { Center, Flex, Input, InputProps, VStack } from '@chakra-ui/react'

import { ReactNode } from 'react'
import { InfoIcon } from '~/assets/icons'
import { TextTooltipElipsis } from '~/components/TextTooltipElipsis/TextTooltipElipsis'

interface BaasInputProps extends InputProps {
    fontColor?: string
    fontHeaderColor?: string
    rightButton?: ReactNode
    headerContent?: ReactNode
    value?: string
    editable?: boolean
    errorMessage?: string
}

export const BaasInput = ({
    fontColor = 'primary.500',
    fontHeaderColor = 'neutral.50',
    rightButton,
    headerContent,
    value,
    editable = true,
    errorMessage,
    ...inputProps
}: BaasInputProps) => {
    return (
        <VStack maxW="full" w="full" align="start" gap="1">
            <Flex
                noOfLines={1}
                flexDir="column"
                color={fontHeaderColor}
                pl="2"
                fontWeight="semibold"
                fontSize={{ base: 'lg', lg: 'xl' }}
                fontFamily={'baasHeading'}
            >
                {headerContent}
            </Flex>

            <Flex
                w="full"
                maxW={'full'}
                overflow={'hidden'}
                justify="space-between"
                fontFamily={'baasBody'}
                fontSize="md"
            >
                <Flex
                    fontFamily={'baasBody'}
                    fontSize="md"
                    flexDir="row"
                    border="1px"
                    w="full"
                    minW="full"
                    borderColor="neutral.500"
                    color={fontColor ? fontColor : 'primary.500'}
                    gap="4px"
                    bg="neutral.900"
                    borderRadius="xl"
                    alignItems="center"
                    py={2}
                    px={4}
                    minH="64px"
                    justify="space-between"
                    position="relative"
                >
                    {editable ? (
                        <Input
                            overflowX={'scroll'}
                            fontFamily={'baasBody'}
                            fontSize="md"
                            sx={{
                                '&:-webkit-autofill': {
                                    transition:
                                        'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
                                    WebkitTextFillColor:
                                        'primary.500 !important', // Use your preferred color here
                                    CaretColor: 'primary.500 !important',
                                },
                            }}
                            whiteSpace="pre-wrap"
                            _placeholder={{
                                color: 'primary.700',
                                fontFamily: 'baasBody',
                                fontSize: 'md',
                            }}
                            _focus={{
                                color: fontColor,
                                fontFamily: 'baasBody',
                                fontSize: 'md',
                            }}
                            m="0"
                            p="0"
                            h="full"
                            w="full"
                            border="none"
                            value={value}
                            {...inputProps}
                        />
                    ) : (
                        <TextTooltipElipsis
                            noOfLines={1}
                            color={'primary.700'}
                            whiteSpace="pre-wrap"
                            fontFamily={'baasBody'}
                            fontSize="md"
                        >
                            {value}
                        </TextTooltipElipsis>
                    )}

                    {rightButton && (
                        <Center
                            cursor="pointer"
                            gap="2"
                            mt={'2px'}
                            alignItems="center"
                            justifyContent="center"
                            height="fit-content"
                        >
                            {rightButton}
                        </Center>
                    )}
                </Flex>
            </Flex>
            <Flex
                flexDir="column"
                fontWeight="regular"
                color={'warning.500'}
                pl="2"
                h="20px"
                fontFamily={'baasHeading'}
                fontSize={'md'}
                lineHeight={'shorter'}
            >
                {errorMessage ? (
                    <Flex gap="1">
                        <InfoIcon />
                        {errorMessage}
                    </Flex>
                ) : (
                    ' '
                )}
            </Flex>
        </VStack>
    )
}
