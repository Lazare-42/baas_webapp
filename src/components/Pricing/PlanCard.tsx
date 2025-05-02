import { CheckIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useCallback } from 'react'
import { STRIPE_ENV } from '~/config/stripe_env'
import { PlanInfo, useSubscription } from '~/contexts/subscription'
import { message } from '~/utils/toast'

interface PlanCardProps {
    plan: PlanInfo | null
    isPopular: boolean
    features: string[]
}

export const PlanCard = ({ features, isPopular, plan }: PlanCardProps) => {
    const {
        currentPlan,
        setCurrentPlan,
        setHighlightedPlan,
        isHighlighted,
        handlePurchase,
        openBillingPortal,
    } = useSubscription()

    // Pas besoin de recalculer cela à chaque render
    const handleMouseEnter = useCallback(() => {
        console.log('plan?.type', plan?.type)
        setHighlightedPlan(plan?.type || 'PayAsYouGo')
    }, [plan?.type, setHighlightedPlan])

    const handleMouseLeave = useCallback(() => {
        setHighlightedPlan(null)
    }, [setHighlightedPlan])

    const handleManageSubscription = async (e: React.MouseEvent) => {
        e.stopPropagation()
        try {
            await openBillingPortal()
        } catch (error) {
            message.error('Failed to open subscription management')
        }
    }

    const handleSubscribe = async () => {
        if (plan?.title === 'Pay as you go') {
            setCurrentPlan('PayAsYouGo')
            return
        }

        const productId =
            plan?.title === 'Scale API'
                ? STRIPE_ENV.stripe.products.scale.price
                : STRIPE_ENV.stripe.products.enterprise.price

        await handlePurchase(productId, 'subscription')
        console.log('currentPlan', currentPlan)
    }

    const isSelected = currentPlan === plan?.type

    return (
        <Box
            bg="neutral.900"
            borderRadius="xl"
            p={6}
            w="full"
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor={
                isSelected || isHighlighted(plan?.type || 'PayAsYouGo')
                    ? 'primary.500'
                    : 'neutral.700'
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            _hover={{
                // boxShadow: `0 0 5px var(--chakra-colors-primary-500)`,

                borderColor: 'primary.700',

                transform: 'translateY(-5px)',
                transition: 'all 0.6s',
            }}
            h="full"
        >
            {isPopular && (
                <Badge
                    position="absolute"
                    top={4}
                    right={4}
                    bg="primary.500"
                    color="neutral.900"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    Popular
                </Badge>
            )}

            <Stack spacing={8} h="full" justifyContent="space-between">
                <Stack spacing={6}>
                    <Box>
                        <Text
                            color="neutral.200"
                            fontSize="xl"
                            fontWeight="bold"
                            mb={2}
                        >
                            {plan?.title}
                        </Text>
                        <Text
                            color="primary.500"
                            fontSize="3xl"
                            fontWeight="bold"
                        >
                            ${plan?.price}
                            <Text
                                as="span"
                                fontSize="sm"
                                color="neutral.400"
                                ml={1}
                            >
                                /{plan?.interval}
                            </Text>
                        </Text>
                    </Box>
                    <Stack spacing={4}>
                        {features.map((feature, index) => (
                            <Flex key={index} align="center">
                                <Box color="primary.500" mr={2}>
                                    <CheckIcon boxSize={4} />
                                </Box>
                                <Text color="neutral.200" fontSize="sm">
                                    {feature}
                                </Text>
                            </Flex>
                        ))}
                    </Stack>
                </Stack>
                <Button
                    variant="plan"
                    isActive={
                        plan?.type !== 'PayAsYouGo' ||
                        currentPlan === 'EnterpriseAPI'
                    }
                    onClick={
                        currentPlan === plan?.type &&
                        currentPlan !== 'PayAsYouGo'
                            ? handleManageSubscription
                            : handleSubscribe
                    }
                    isDisabled={!plan?.active}
                >
                    {isSelected && currentPlan !== 'PayAsYouGo'
                        ? 'Manage Subscription'
                        : plan?.type === 'PayAsYouGo'
                          ? 'Activate'
                          : 'Subscribe'}
                </Button>
            </Stack>
        </Box>
    )
}
