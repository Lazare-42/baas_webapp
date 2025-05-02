import { MeetingInfo } from '~/api/api'
import { useRequest } from './useRequest'

export function useMeetingData(botId: string | null, apiKey: string | null) {
    //todo: put this route in the api folder
    const { data, isLoading, error } = useRequest<MeetingInfo>({
        url: '/bots/meeting_data',
        params: { bot_id: botId },
        headers: {
            'x-meeting-baas-api-key': apiKey,
        },
    })

    return {
        meetingData: botId && apiKey ? data : null,
        loading: botId && apiKey ? isLoading : false,
        error: botId && apiKey ? error : null,
    }
}
