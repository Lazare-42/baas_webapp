import { CloseIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Center,
    CircularProgress,
    CircularProgressLabel,
    Divider,
    Fade,
    Flex,
    Grid,
    HStack,
    IconButton,
    Progress,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LightningIcon } from '~/assets/icons/LightningIcon'
import { useConsumption } from '~/contexts/consumption'

import { useSubscription } from '~/contexts/subscription'

export const TokensOverview = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { totalTokens, userTokens, isLoading } = useConsumption()
    const { currentPlan, plansInfo, subscription } = useSubscription()

    //totalTokens + available Tokens / totalTokens
    console.log('userTokens', userTokens)
    const {
        AvailableTokens,
        tmpAvailableTokens,
        percentageLeft,
        totalTokensAndAvailableTokens,
    } = useMemo(() => {
        console.log('totalTokens', totalTokens)
        const AvailableTokens = userTokens?.available_tokens ?? 0
        console.log('AvailableTokens', AvailableTokens)
        const tmpAvailableTokens = AvailableTokens <= 0 ? 0 : AvailableTokens
        console.log('tmpAvailableTokens', tmpAvailableTokens)
        const totalTokensAndAvailableTokens =
            totalTokens >= 0 ? totalTokens + tmpAvailableTokens : totalTokens
        console.log(
            'totalTokensAndAvailableTokens',
            totalTokensAndAvailableTokens,
        )
        const percentageLeft =
            tmpAvailableTokens <= 0
                ? 0
                : totalTokens >= 0
                  ? 100 - (totalTokens / totalTokensAndAvailableTokens) * 100
                  : 100
        return {
            AvailableTokens,
            tmpAvailableTokens,
            percentageLeft,
            totalTokensAndAvailableTokens,
        }
    }, [userTokens])

    enum criticalLevel {
        CRITICAL = 10,
        WARNING = 20,
    }
    const [critical, setCritical] = useState<critical>('normal')
    useEffect(() => {
        console.log('percentageLeft', percentageLeft)
        setCritical(howCritical(percentageLeft))
    }, [percentageLeft])
    type critical = 'critical' | 'warning' | 'normal'

    const howCritical = (percentageLeft: number): critical => {
        if (percentageLeft <= criticalLevel.CRITICAL) return 'critical'
        if (percentageLeft <= criticalLevel.WARNING) return 'warning'
        return 'normal'
    }
    const criticalColor =
        critical === 'critical'
            ? 'error.500'
            : critical === 'warning'
              ? 'warning.500'
              : 'primary.500'

    // Show warning toast when tokens are low
    useEffect(() => {
        if (
            (critical === 'critical' || critical === 'warning') &&
            !toast.isActive('low-tokens')
        ) {
            toast({
                id: 'low-tokens',
                duration: null,
                position: 'top',
                isClosable: true,
                render: ({ onClose }) => (
                    <HStack
                        bg={criticalColor}
                        color="neutral.900"
                        p={4}
                        borderRadius="lg"
                        justify="space-between"
                        spacing={4}
                    >
                        <VStack align="start" spacing={1}>
                            <Text fontWeight="bold">
                                {critical === 'critical'
                                    ? 'Critical level of Tokens'
                                    : 'Low tokens'}
                            </Text>
                            <Text fontSize="sm">
                                Consider purchasing more tokens soon
                            </Text>
                        </VStack>
                        <HStack spacing={2}>
                            <Button
                                size="sm"
                                bg="neutral.900"
                                color="neutral.200"
                                _hover={{ bg: 'neutral.700' }}
                                onClick={() => {
                                    navigate('/billing')
                                    toast.close('low-tokens')
                                }}
                            >
                                View Plans
                            </Button>
                            <IconButton
                                size="sm"
                                border="1px solid"
                                borderColor="neutral.900"
                                color="neutral.900"
                                _hover={{
                                    bg: 'rgba(0, 0, 0, 0.2)',
                                    color: 'black',
                                }}
                                colorScheme="black"
                                icon={<CloseIcon />}
                                onClick={onClose}
                                aria-label="Close toast"
                            />
                        </HStack>
                    </HStack>
                ),
            })
        }
    }, [critical, toast, navigate])

    return (
        <Grid
            templateColumns={{ base: '1fr', md: '1fr 4fr 1fr' }}
            gap={8}
            bg="neutral.900"
            rounded={'xl'}
            p="6"
        >
            <Flex direction="column" align="center" justify="center" h="full">
                <CircularProgress
                    value={isLoading ? 0 : percentageLeft}
                    thickness="6px"
                    color={criticalColor}
                    trackColor="neutral.700"
                    size="180px"
                >
                    <CircularProgressLabel
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        h="100%"
                        w="100%"
                    >
                        <Center flexDirection="column" gap={1}>
                            <Text
                                color="neutral.400"
                                fontSize="sm"
                                mb={2}
                                lineHeight={'2px'}
                            >
                                Tokens Used
                            </Text>
                            <Text
                                color="neutral.400"
                                fontSize="xs"
                                mb={2}
                                lineHeight={'2px'}
                            >
                                in period
                            </Text>
                            <Text
                                color="neutral.200"
                                fontSize="md"
                                lineHeight={'15px'}
                            >
                                {isLoading
                                    ? '-'
                                    : totalTokens.toLocaleString('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                      })}
                            </Text>
                            <Divider
                                w="50px"
                                borderColor={criticalColor}
                                borderWidth="1px"
                                rounded="full"
                            />
                            <Text
                                color={
                                    AvailableTokens <= 0
                                        ? criticalColor
                                        : 'neutral.50'
                                }
                                fontSize="xl"
                                fontWeight="bold"
                                mb={2}
                                lineHeight={'12px'}
                            >
                                {isLoading
                                    ? '-'
                                    : AvailableTokens.toLocaleString('en-US', {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                      })}
                            </Text>
                            <Text
                                color="neutral.400"
                                fontSize="sm"
                                mb={2}
                                lineHeight={'10px'}
                            >
                                Available
                            </Text>
                        </Center>
                    </CircularProgressLabel>
                </CircularProgress>
            </Flex>

            {/* Right side with usage bar and warning */}
            <Flex direction="column" justify="center">
                <Flex justify="space-between" align="center">
                    <Text color="neutral.200" fontSize="sm">
                        Percentage of tokens used over selected period
                    </Text>
                    <Text color={criticalColor} fontWeight="bold">
                        {/* {tokensLeft} */}
                        {isLoading
                            ? '-'
                            : `${(100 - percentageLeft).toFixed(1)}%`}
                    </Text>
                </Flex>

                <Box position="relative" gap={6}>
                    <Progress
                        value={isLoading ? 0 : 100 - percentageLeft}
                        size="lg"
                        rounded="full"
                        bg="neutral.700"
                        sx={{
                            '& > div': {
                                background:
                                    critical === 'critical'
                                        ? 'error.500'
                                        : critical === 'warning'
                                          ? 'warning.500'
                                          : 'primary.500',
                            },
                        }}
                    />
                    {!isLoading && critical === 'critical' && (
                        <Flex
                            mt={4}
                            bg={
                                critical === 'critical'
                                    ? 'error.500'
                                    : critical === 'warning'
                                      ? 'warning.500'
                                      : 'primary.500'
                            }
                            color="neutral.900"
                            p={3}
                            borderRadius="lg"
                            align="center"
                            justify="space-between"
                        >
                            <Flex align="center" gap={2}>
                                <LightningIcon />
                                <Text fontWeight="medium">
                                    {critical === 'critical'
                                        ? "Critical: You're about to run out of tokens!"
                                        : critical === 'warning'
                                          ? 'Low tokens: Consider purchasing more tokens soon'
                                          : 'You have enough tokens'}
                                </Text>
                            </Flex>
                            <Button
                                size="sm"
                                bg="neutral.900"
                                color="neutral.200"
                                _hover={{ bg: 'neutral.700' }}
                                onClick={() => navigate('/billing')}
                            >
                                View Plans
                            </Button>
                        </Flex>
                    )}
                </Box>
            </Flex>
            <Flex direction="column" justify="center" align="center">
                <Text color="neutral.400" fontSize="sm" mb={2}>
                    Current Plan
                </Text>
                <Fade in={!isLoading} transition={{ enter: { duration: 0.2 } }}>
                    <VStack
                        spacing={2}
                        align="center"
                        bg="neutral.800"
                        p={4}
                        borderRadius="lg"
                        minW="200px"
                    >
                        {subscription?.email ? (
                            <Text
                                color="neutral.200"
                                fontSize="sm"
                                fontWeight="semibold"
                            >
                                {subscription.email}
                            </Text>
                        ) : (
                            <Text
                                color="neutral.200"
                                fontSize="sm"
                                fontWeight="semibold"
                            >
                                {isLoading ? '-' : 'No email'}
                            </Text>
                        )}
                        <Text
                            color="neutral.50"
                            fontSize="2xl"
                            fontWeight="bold"
                            letterSpacing="tight"
                        >
                            {plansInfo[currentPlan]?.title}
                        </Text>
                        {!isLoading &&
                            plansInfo[currentPlan]?.tokenDiscount &&
                            plansInfo[currentPlan]?.tokenDiscount > 0 && (
                                <Text
                                    color="primary.500"
                                    fontSize="sm"
                                    fontWeight="bold"
                                >
                                    {plansInfo[currentPlan]?.tokenDiscount}%
                                    discount on tokens
                                </Text>
                            )}
                    </VStack>
                </Fade>
            </Flex>
        </Grid>
    )
}
