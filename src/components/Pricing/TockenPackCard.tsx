import { Box, Button, Flex, Stack, Text, VStack } from '@chakra-ui/react'

import { CheckedIcon } from '~/assets/icons'

import { STRIPE_ENV } from '~/config/stripe_env'
import { TokenPackInfo, useSubscription } from '~/contexts/subscription'

export const TokenPackCard = ({
    pack,
    features,
}: {
    pack: TokenPackInfo
    features: string[]
}) => {
    const { currentPlan, highlightedPlan, handlePurchase, getPlanInfo } =
        useSubscription()

    const planInfo = getPlanInfo(highlightedPlan || currentPlan)

    const getDiscountedPrice = () => {
        if (!planInfo) return Number(pack.price)
        return Number(pack.price) * (1 - planInfo.tokenDiscount / 100)
    }

    const getDiscount = () => {
        if (!planInfo || planInfo.tokenDiscount === 0) return null
        return `-${planInfo.tokenDiscount}%`
    }

    const handlePackPurchase = async () => {
        let priceId
        switch (pack.title) {
            case 'Starter Pack':
                priceId = STRIPE_ENV.stripe.products.packs.starter.price
                break
            case 'Pro Pack':
                priceId = STRIPE_ENV.stripe.products.packs.pro.price
                break
            case 'Business Pack':
                priceId = STRIPE_ENV.stripe.products.packs.business.price
                break
            case 'Enterprise Pack':
                priceId = STRIPE_ENV.stripe.products.packs.enterprise.price
                break
            default:
                console.error('Unknown pack type')
                return
        }
        console.log(priceId)
        const discount = getDiscount()
        await handlePurchase(priceId, 'payment', planInfo?.tokenDiscount)
    }

    const discountedPrice = getDiscountedPrice()
    const showOriginalPrice = currentPlan !== 'PayAsYouGo' || highlightedPlan
    const discount = getDiscount()

    return (
        <Box
            bg="neutral.900"
            borderRadius="lg"
            p={6}
            w="full"
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor={'neutral.700'}
            _hover={{
                borderColor: 'primary.700',
                transform: 'translateY(-5px)',
                transition: 'all 0.6s',
            }}
            justifyContent="space-between"
            h="full"
        >
            <Stack spacing={4} h="full" justifyContent="space-between">
                <Stack spacing={6}>
                    <Box>
                        <Flex w="full" justifyContent="space-between">
                            <Box>
                                <Text
                                    color="neutral.200"
                                    fontSize={['md', 'lg']}
                                    fontWeight="bold"
                                >
                                    {pack.title}
                                </Text>
                            </Box>

                            <VStack>
                                <Text
                                    lineHeight={'12px'}
                                    color="primary.500"
                                    fontSize={['2xl', '4xl']}
                                    fontWeight="bold"
                                >
                                    {pack.tokens}
                                </Text>
                                <Text color="primary.700" fontSize="sm">
                                    tokens
                                </Text>
                            </VStack>
                        </Flex>
                        <Flex w="full" justifyContent="space-between">
                            <Flex align="baseline" gap={2}>
                                {discount && (
                                    <Text
                                        color="neutral.400"
                                        fontSize="lg"
                                        textDecoration="line-through"
                                    >
                                        ${pack.price}
                                    </Text>
                                )}
                                <Text
                                    color="primary.500"
                                    fontSize="3xl"
                                    fontWeight="bold"
                                >
                                    ${discountedPrice.toFixed(0)}
                                </Text>
                            </Flex>
                            <Text color="neutral.400" fontSize="md">
                                ${(discountedPrice / pack.tokens).toFixed(2)}{' '}
                                /Tk
                            </Text>
                        </Flex>

                        <Flex
                            h="10px"
                            w="full"
                            gap={2}
                            justifyContent="space-between"
                            justifyItems={'flex-end'}
                        >
                            <Text color="primary.500" fontSize="sm">
                                {discount ? discount : ''}
                            </Text>
                        </Flex>
                    </Box>
                    <Stack spacing={4}>
                        {features.map((feature, index) => (
                            <Flex key={index} align="center">
                                <Box color="primary.500" mr={2}>
                                    <CheckedIcon boxSize={4} />
                                </Box>
                                <Text color="neutral.200" fontSize="sm">
                                    {feature}
                                </Text>
                            </Flex>
                        ))}
                    </Stack>
                </Stack>
                <Button
                    variant={'plan'}
                    isActive={true}
                    onClick={handlePackPurchase}
                >
                    Purchase
                </Button>
            </Stack>
        </Box>
    )
}
