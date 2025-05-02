import { Flex } from '@chakra-ui/react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useConsumption } from '~/contexts/consumption'

interface LineProps {
    key: string
    color: string
    label?: string
}

interface ChartDataPoint {
    name: string
    isValid: boolean
    date: Date
    [key: string]: any // Pour permettre des données dynamiques
}

interface SimpleChartProps {
    data: ChartDataPoint[]
    lines: LineProps[]
    yAxisLabel?: string
    height?: number
}

export const SimpleChart = ({ data, lines, yAxisLabel }: SimpleChartProps) => {
    const { costOrActivity } = useConsumption()
    console.log(data)
    console.log(lines)
    return (
        <Flex
            bg="neutral.900"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="neutral.700"
            flexGrow={1}
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                        dataKey="name"
                        stroke="#718096"
                        tick={{ fill: '#718096' }}
                    />
                    <YAxis
                        stroke="#718096"
                        tick={{ fill: '#718096' }}
                        label={
                            yAxisLabel
                                ? {
                                      value: yAxisLabel,
                                      angle: -90,
                                      position: 'insideLeft',
                                      style: { fill: '#718096' },
                                  }
                                : undefined
                        }
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1A202C',
                            border: '1px solid #2D3748',
                            borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#A0AEC0' }}
                        itemStyle={{ color: '#E2E8F0' }}
                        formatter={(value) =>
                            `${typeof value === 'number' ? value.toFixed(2) : value} ${costOrActivity}`
                        }
                    />
                    {lines?.map((line, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            name={line.label}
                            dataKey={line.key}
                            stroke={line.color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Flex>
    )
}
