import {
    Box,
    Container,
    Grid,
    Heading,
    Spinner,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import { PlanType } from '~/api/subscription/types'
import { PlanCard } from '~/components/Pricing/PlanCard'
import { TokenPackCard } from '~/components/Pricing/TockenPackCard'
import { TokenRateCard } from '~/components/Pricing/TockenRateCard'
import { useSubscription } from '~/contexts/subscription'
import { Layout } from '../Layout/Layout'

const TOKEN_RATES = [
    {
        title: 'Raw Recording',
        rate: '1.00 token',
        unit: 'per hour',
        subtitle: 'Includes speaker diarization',
    },
    {
        title: 'Transcription',
        rate: '+0.25 token',
        unit: 'per hour',
        subtitle: 'Gladia transcription',
    },
    {
        title: 'BYOK Transcription',
        rate: 'Included',
        unit: 'with any plan',
        subtitle: '(Bring Your Own Key)',
    },
    {
        title: 'Streaming',
        rate: '+0.10 token',
        unit: 'per hour',
        subtitle: 'Per input or output',
    },
    {
        title: 'Calendar Sync',
        rate: 'Enterprise',
        unit: 'plan only',
    },
]

const LoadingState = () => (
    <Layout>
        <Container maxW="8xl">
            <VStack spacing={8} align="center" justify="center" minH="60vh">
                <Spinner size="xl" color="primary.500" thickness="4px" />
                <Text color="neutral.400" fontSize="lg">
                    Loading plans...
                </Text>
            </VStack>
        </Container>
    </Layout>
)

export const BillingPage = () => {
    const { getTokenPacks, isLoading, getPlanInfo } = useSubscription()

    if (isLoading) {
        return <LoadingState />
    }

    const API_PLAN_TYPES: PlanType[] = [
        'PayAsYouGo',
        'ScaleAPI',
        'EnterpriseAPI',
    ]

    const API_PLANS = API_PLAN_TYPES.map((planType) => ({
        plan: getPlanInfo(planType),
        isPopular: planType === 'ScaleAPI',
        features: getFeaturesByPlan(planType),
    }))

    function getFeaturesByPlan(plan: PlanType) {
        const planInfo = getPlanInfo(plan)
        if (!planInfo) return []

        const features = [
            `${planInfo.requestsPerSecond} req/sec`,
            `${planInfo.concurrentBots} concurrent bots`,
        ]

        if (plan === 'PayAsYouGo') {
            features.push('Basic support')
        } else if (plan === 'ScaleAPI') {
            features.push('Priority support')
        } else if (plan === 'EnterpriseAPI') {
            features.push('Advanced support')
        }

        return features
    }

    return (
        <Layout>
            <Container
                display={'flex'}
                flexDirection={'column'}
                maxW="8xl"
                rounded={'2xl'}
                px={2}
                overflowY={'scroll'}
                gap={{ base: 4, md: 8 }}
                sx={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <VStack spacing={6} align="stretch" w="full">
                    <VStack bg="neutral.900" rounded={'xl'} p="6" gap={6}>
                        <Box width="full">
                            <Wrap spacing={6} justify="center" align="stretch">
                                {TOKEN_RATES.map((rate) => (
                                    <WrapItem
                                        key={rate.title}
                                        flex="1"
                                        minW={{ base: 'full', md: '200px' }}
                                        maxW={{ base: 'full', md: '250px' }}
                                        minH="150px"
                                    >
                                        <TokenRateCard {...rate} />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        </Box>
                        <Heading
                            fontSize="lg"
                            color="neutral.400"
                            w="full"
                            fontWeight="medium"
                        >
                            Token usage rates per service.
                        </Heading>
                    </VStack>
                    <VStack bg="neutral.900" rounded={'xl'} p="6" gap={6}>
                        <Grid
                            w="full"
                            templateColumns={{
                                base: '1fr',
                                xl: 'repeat(3, 1fr)',
                            }}
                            gap={6}
                        >
                            {API_PLANS.map((x) =>
                                x.plan ? (
                                    <PlanCard key={x.plan.title} {...x} />
                                ) : null,
                            )}
                        </Grid>
                        <Heading
                            color="primary.500"
                            fontSize="xl"
                            w="full"
                            textAlign="left"
                            opacity={0.8}
                        >
                            1. Choose your API plan
                        </Heading>
                    </VStack>

                    {/* Token Packs */}
                    <VStack bg="neutral.900" rounded={'xl'} p="6" gap={6}>
                        <Grid
                            w="full"
                            templateColumns={{
                                base: '1fr',
                                md: 'repeat(2, 1fr)',
                                xl: 'repeat(4, 1fr)',
                            }}
                            gap={6}
                        >
                            {getTokenPacks().map((pack) => (
                                <TokenPackCard
                                    key={pack.title}
                                    pack={pack}
                                    features={pack.features}
                                />
                            ))}
                        </Grid>
                        <Heading
                            color="primary.500"
                            fontSize="xl"
                            w="full"
                            textAlign="left"
                            opacity={0.8}
                        >
                            2. Purchase token packs
                        </Heading>
                    </VStack>
                </VStack>
            </Container>
        </Layout>
    )
}
