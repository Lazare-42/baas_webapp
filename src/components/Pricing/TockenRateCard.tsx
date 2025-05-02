import { Box, Flex, Text } from '@chakra-ui/react'
import { useSubscription } from '~/contexts/subscription'

interface TokenRateCardProps {
    title: string
    rate: string
    unit: string
    subtitle?: string
}

export const TokenRateCard = ({
    title,
    rate,
    unit,
    subtitle,
}: TokenRateCardProps) => {
    const { currentPlan, highlightedPlan } = useSubscription()
    const isEntreprisePlanHighlighted =
        (!title.includes('Calendar') && highlightedPlan !== 'EnterpriseAPI') ||
        highlightedPlan === 'EnterpriseAPI' ||
        (currentPlan === 'EnterpriseAPI' && highlightedPlan === null)
    return (
        <Box
            p={6}
            w="full"
            h="full"
            position="relative"
            overflow="hidden"
            borderRadius="3xl"
            // boxShadow={`0 0 5px ${isEntreprisePlanHighlighted ? 'var(--chakra-colors-primary-500)' : 'transparent'}`}
            border="1px solid"
            borderColor={
                isEntreprisePlanHighlighted ? 'primary.700' : 'neutral.700'
            }
        >
            <Flex direction="column" gap={2}>
                <Text color="neutral.200" fontSize="sm" fontWeight="medium">
                    {title}
                </Text>
                <Text
                    color={
                        isEntreprisePlanHighlighted
                            ? 'primary.500'
                            : 'primary.700'
                    }
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    {rate}
                </Text>
                <Text color="neutral.400" fontSize="sm">
                    {unit}
                </Text>
                {subtitle && (
                    <Text color="neutral.400" fontSize="xs">
                        {subtitle}
                    </Text>
                )}
            </Flex>
        </Box>
    )
}
