import { Box, Fade, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useConsumption } from '~/contexts/consumption'

export const TokenConsumptionBreakdown = () => {
    const { chartData, isLoading, costOrActivity } = useConsumption()

    // TODO: fix this with hours
    const totalHours = chartData.reduce(
        (acc, day) => ({
            duration: acc.duration + day.duration,
            transcription_hour: acc.transcription_hour + day.transcription_hour,
            streaming_input_hour:
                acc.streaming_input_hour + day.streaming_input_hour,
            streaming_output_hour:
                acc.streaming_output_hour + day.streaming_output_hour,
        }),
        {
            duration: 0,
            transcription_hour: 0,
            streaming_input_hour: 0,
            streaming_output_hour: 0,
        },
    )
    const totalTokens = chartData.reduce(
        (acc, x) => ({
            recording_tokens: acc.recording_tokens + x.recording_tokens,
            transcription_tokens:
                acc.transcription_tokens + x.transcription_tokens,
            streaming_input_tokens:
                acc.streaming_input_tokens + x.streaming_input_tokens,
            streaming_output_tokens:
                acc.streaming_output_tokens + x.streaming_output_tokens,
        }),
        {
            recording_tokens: 0,
            transcription_tokens: 0,
            streaming_input_tokens: 0,
            streaming_output_tokens: 0,
        },
    )

    const tokenMetrics = [
        {
            label: 'Bot Duration',
            value: totalTokens.recording_tokens.toFixed(2) ?? 0,
            unit: 'tokens',
        },
        {
            label: 'Transcription',
            value: totalTokens.transcription_tokens.toFixed(2) ?? 0,
            unit: 'tokens',
        },
        {
            label: 'Streaming Input',
            value: totalTokens.streaming_input_tokens.toFixed(2) ?? 0,
            unit: 'tokens',
        },
        {
            label: 'Streaming Output',
            value: totalTokens.streaming_output_tokens.toFixed(2) ?? 0,
            unit: 'tokens',
        },
    ]

    const hourMetrics = [
        {
            label: 'Bot Duration',
            value: totalHours.duration.toFixed(2),
            unit: 'hours',
        },
        {
            label: 'Transcription',
            value: totalHours.transcription_hour.toFixed(2),
            unit: 'hours',
        },
        {
            label: 'Input Streaming',
            value: totalHours.streaming_input_hour.toFixed(2),
            unit: 'hours',
        },
        {
            label: 'Output Streaming',
            value: totalHours.streaming_output_hour.toFixed(2),
            unit: 'hours',
        },
    ]

    const MetricBox = ({
        metric,
        isLoading,
    }: {
        metric: (typeof tokenMetrics)[0] | (typeof hourMetrics)[0]
        isLoading: boolean
    }) => (
        <Box
            bg="neutral.900"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="neutral.700"
        >
            <Text color="neutral.200" fontSize="sm">
                {metric.label}
            </Text>
            <Flex align="baseline" gap={1} mt={1}>
                <Text color="white" fontSize="2xl" fontWeight="bold">
                    {isLoading ? '-' : metric.value.toLocaleString()}
                </Text>
                <Text color="neutral.400" fontSize="sm">
                    {metric.unit}
                </Text>
            </Flex>
        </Box>
    )

    return (
        <VStack spacing={6} align="stretch">
            <Fade in={!isLoading} transition={{ enter: { duration: 0.2 } }}>
                <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
                    {costOrActivity === 'tokens'
                        ? tokenMetrics.map((metric, index) => (
                              <MetricBox
                                  key={index}
                                  metric={metric}
                                  isLoading={isLoading}
                              />
                          ))
                        : hourMetrics.map((metric, index) => (
                              <MetricBox
                                  key={index}
                                  metric={metric}
                                  isLoading={isLoading}
                              />
                          ))}
                </SimpleGrid>
            </Fade>
        </VStack>
    )
}
