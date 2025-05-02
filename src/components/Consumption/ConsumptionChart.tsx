import { DownloadIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { RangeDatepicker } from '~/components/Atoms/DatePicker'

import { useConsumption } from '~/contexts/consumption'
import { SimpleChart } from './SimpleChart'
import { TokenConsumptionBreakdown } from './TokenConsumptionBreakdown'
import { TokensOverview } from './TokensOverview'

// ConsumptionChart.tsx
export const ConsumptionChart = () => {
    const {
        dateRange,
        handleDateChange,
        chartData,
        handleDownloadCSV,
        isDownloading,
        costOrActivity,
        setCostOrActivity,
    } = useConsumption()
    const getChartConfig = (costOrActivity: 'tokens' | 'hours') => {
        const configs = {
            hours: {
                lines: [
                    { key: 'transcription_hour', color: '#78FFF0' }, // primary
                    { key: 'transcription_byok_hour', color: '#FF7EB3' }, // rose
                    { key: 'streaming_output_hour', color: '#7EDFA2' }, // vert
                    { key: 'streaming_input_hour', color: '#FFE075' }, // jaune
                ],
                yAxisLabel: 'Hours',
            },
            tokens: {
                lines: [
                    { key: 'recording_tokens', color: '#78FFF0' },
                    { key: 'transcription_tokens', color: '#FF7EB3' },
                    { key: 'transcription_byok_tokens', color: '#7EDFA2' },
                    { key: 'streaming_output_tokens', color: '#FFE075' },
                    { key: 'streaming_input_tokens', color: '#7DB9FF' }, // bleu
                ],
                yAxisLabel: 'Tokens',
            },
        }

        return configs[costOrActivity]
    }

    // Utilisation
    const { lines, yAxisLabel } = getChartConfig(costOrActivity)

    return (
        <Flex flexDir="column" w="full" gap={4} h="full">
            <Flex w="full" justify={'space-between'}>
                <Flex
                    gap="2"
                    rounded={'lg'}
                    w="fit-content"
                    p="1"
                    bg="neutral.900"
                >
                    <Button
                        variant={'chartType'}
                        isActive={costOrActivity === 'tokens'}
                        onClick={() => setCostOrActivity('tokens')}
                    >
                        Tokens
                    </Button>
                    <Button
                        variant={'chartType'}
                        isActive={costOrActivity === 'hours'}
                        onClick={() => setCostOrActivity('hours')}
                    >
                        Hours
                    </Button>
                </Flex>
                <Flex
                    gap="2"
                    rounded={'lg'}
                    w="fit-content"
                    p="1"
                    bg="neutral.900"
                >
                    <RangeDatepicker
                        selectedDates={
                            [dateRange.startDate, dateRange.endDate].filter(
                                Boolean,
                            ) as Date[]
                        }
                        onDateChange={handleDateChange}
                        configs={{
                            dateFormat: 'yyyy-MM-dd',
                            monthsToDisplay: 1,
                        }}
                        closeOnSelect={true}
                    />
                    <Button
                        variant={'chartType'}
                        isActive={true}
                        onClick={handleDownloadCSV}
                        isLoading={isDownloading}
                    >
                        <DownloadIcon />
                    </Button>
                </Flex>
            </Flex>

            <TokensOverview />
            <TokenConsumptionBreakdown />

            {/* Main consumption chart */}
            <SimpleChart
                data={chartData}
                lines={lines}
                yAxisLabel={yAxisLabel}
            />
        </Flex>
    )
}
