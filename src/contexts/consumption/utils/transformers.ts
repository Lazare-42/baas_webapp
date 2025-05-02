import { format } from 'date-fns'
import { DailyTokenConsumption } from '~/api/consumption/types'
import { TransformedChartData } from '../types/chart'

export const transformToTokenChartData = (
    data: DailyTokenConsumption[],
    startDate: Date,
    endDate: Date,
): TransformedChartData[] => {
    console.log('Input data:', data)
    const allDates: Date[] = []
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
        allDates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return allDates.map((date) => {
        console.log('Checking date:', date.toDateString())
        const existingData = data.find((d) => {
            console.log('Comparing with:', new Date(d.date).toDateString())
            return new Date(d.date).toDateString() === date.toDateString()
        })

        if (!existingData) {
            return {
                name: format(date, 'dd/MM'),
                duration: 0,
                total_tokens: 0,
                recording_tokens: 0,
                transcription_tokens: 0,
                transcription_hour: 0,
                transcription_byok_tokens: 0,
                transcription_byok_hour: 0,
                streaming_input_tokens: 0,
                streaming_output_tokens: 0,
                streaming_input_hour: 0,
                streaming_output_hour: 0,
                isValid: date <= new Date(),
                date,
            }
        }

        const totalTokens =
            existingData.consumption_by_service.recording_tokens +
            existingData.consumption_by_service.transcription_tokens +
            existingData.consumption_by_service.transcription_byok_tokens +
            existingData.consumption_by_service.streaming_input_tokens +
            existingData.consumption_by_service.streaming_output_tokens

        return {
            name: format(date, 'dd/MM'),
            duration: existingData.consumption_by_service.duration / 3600,
            total_tokens: totalTokens,
            recording_tokens:
                existingData.consumption_by_service.recording_tokens,
            transcription_tokens:
                existingData.consumption_by_service.transcription_tokens +
                existingData.consumption_by_service.transcription_byok_tokens,
            transcription_hour:
                existingData.consumption_by_service.transcription_hour / 3600,
            transcription_byok_tokens:
                existingData.consumption_by_service.transcription_byok_tokens,
            transcription_byok_hour:
                existingData.consumption_by_service.transcription_byok_hour /
                3600,
            streaming_input_tokens:
                existingData.consumption_by_service.streaming_input_tokens,
            streaming_output_tokens:
                existingData.consumption_by_service.streaming_output_tokens,
            streaming_input_hour:
                existingData.consumption_by_service.streaming_input_hour / 3600,
            streaming_output_hour:
                existingData.consumption_by_service.streaming_output_hour /
                3600,
            isValid: date <= new Date(),
            date,
        }
    })
}
