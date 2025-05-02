import { BotData } from '~/api/bots/types'
import {
    GOOGLE_MEET_NAME,
    PlatformName,
    TEAMS_NAME,
    UNKNOWN_NAME,
    ZOOM_NAME,
} from '../constants'

export const getBotMatches = (bot: BotData, searchTerm: string) => {
    const matches = {
        id: bot.bot.uuid.toLowerCase().includes(searchTerm),
        name: bot.params.bot_name.toLowerCase().includes(searchTerm),
        url: bot.bot.meeting_url.toLowerCase().includes(searchTerm),
    }

    return {
        matches: Object.values(matches).some(Boolean),
        matchDetails: matches,
    }
}

export const getPlatformFromUrl = (url?: string): PlatformName => {
    if (!url) return UNKNOWN_NAME
    if (url.includes('zoom')) return ZOOM_NAME
    if (url.includes('teams')) return TEAMS_NAME
    if (url.includes('meet.google')) return GOOGLE_MEET_NAME
    return UNKNOWN_NAME
}
