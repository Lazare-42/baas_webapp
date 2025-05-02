import axios from 'axios'
import { format } from 'date-fns'
import { DailyTokenConsumption, UserTokensResponse } from './types'

export async function getUserTokens(): Promise<UserTokensResponse> {
    const response = await axios.get('/accounts/user_tokens')
    return response.data
}

export async function getTokenConsumption(params: {
    start_date?: Date
    end_date?: Date
}): Promise<DailyTokenConsumption[]> {
    const formattedParams = {
        ...(params.start_date && {
            start_date: `${format(params.start_date, 'yyyy-MM-dd')}T00:00:00`,
        }),
        ...(params.end_date && {
            end_date: `${format(params.end_date, 'yyyy-MM-dd')}T23:59:59`,
        }),
    }

    const response = await axios.get('/bots/token_consumption', {
        params: formattedParams,
    })
    console.log(response.data)
    return response.data
}

//Mocked data
// export async function getTokenConsumption(params: {
//     start_date?: Date
//     end_date?: Date
// }): Promise<DailyTokenConsumption[]> {
//     await new Promise((resolve) => setTimeout(resolve, 100))

//     // Generate 30 days of data
//     const mockData: DailyTokenConsumption[] = Array.from(
//         { length: 30 },
//         (_, i) => {
//             const date = new Date(2025, 0, i + 1)
//             // Add some randomness to make data more realistic
//             const baseMultiplier = 1 + Math.sin(i / 5) * 0.3 // Creates a wave pattern
//             const randomFactor = 0.8 + Math.random() * 0.4 // Random variation between 0.8 and 1.2
//             const dailyMultiplier = baseMultiplier * randomFactor

//             // Base values
//             const base = {
//                 recording_tokens: 150,
//                 transcription_tokens: 250,
//                 transcription_hour: 15,
//                 transcription_byok_tokens: 50,
//                 transcription_byok_hour: 5,
//                 streaming_output_tokens: 30,
//                 streaming_output_hour: 20,
//                 streaming_input_tokens: 20,
//                 streaming_input_hour: 18,
//                 duration: 1,
//             }
//             // Apply multiplier to all values
//             const consumption: TokenConsumptionByService = {
//                 duration:
//                     Math.round(base.duration * dailyMultiplier * 100) / 100,
//                 recording_tokens:
//                     Math.round(base.recording_tokens * dailyMultiplier * 100) /
//                     100,
//                 transcription_tokens:
//                     Math.round(
//                         base.transcription_tokens * dailyMultiplier * 100,
//                     ) / 100,
//                 transcription_hour:
//                     Math.round(
//                         base.transcription_hour * dailyMultiplier * 100,
//                     ) / 100,
//                 transcription_byok_tokens:
//                     Math.round(
//                         base.transcription_byok_tokens * dailyMultiplier * 100,
//                     ) / 100,
//                 transcription_byok_hour:
//                     Math.round(
//                         base.transcription_byok_hour * dailyMultiplier * 100,
//                     ) / 100,
//                 streaming_output_tokens:
//                     Math.round(
//                         base.streaming_output_tokens * dailyMultiplier * 100,
//                     ) / 100,
//                 streaming_output_hour:
//                     Math.round(
//                         base.streaming_output_hour * dailyMultiplier * 100,
//                     ) / 100,
//                 streaming_input_tokens:
//                     Math.round(
//                         base.streaming_input_tokens * dailyMultiplier * 100,
//                     ) / 100,
//                 streaming_input_hour:
//                     Math.round(
//                         base.streaming_input_hour * dailyMultiplier * 100,
//                     ) / 100,
//             }

//             // Weekends have ~60% of weekday traffic
//             const isWeekend = date.getDay() === 0 || date.getDay() === 6
//             if (isWeekend) {
//                 consumption.duration *= 0.6
//                 consumption.recording_tokens *= 0.6
//                 consumption.transcription_tokens *= 0.6
//                 consumption.transcription_hour *= 0.6
//                 consumption.transcription_byok_tokens *= 0.6
//                 consumption.transcription_byok_hour *= 0.6
//                 consumption.streaming_output_tokens *= 0.6
//                 consumption.streaming_output_hour *= 0.6
//                 consumption.streaming_input_tokens *= 0.6
//                 consumption.streaming_input_hour *= 0.6
//             }
//             const response = {
//                 date: date.toISOString().split('T')[0],
//                 consumption_by_service: consumption,
//             }

//             return response
//         },
//     )

//     // Filter based on date range if provided
//     const filteredData = mockData.filter((entry) => {
//         const entryDate = new Date(entry.date)
//         if (params.start_date && entryDate < params.start_date) return false
//         if (params.end_date && entryDate > params.end_date) return false
//         return true
//     })
//     console.log('Dates to filter:', params.start_date, params.end_date)
//     console.log('Mock data before filter:', mockData.length)
//     console.log('Filtered data:', filteredData.length)
//     console.log(filteredData)
//     return filteredData
// }
