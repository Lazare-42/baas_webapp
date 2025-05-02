import { TableTooltip } from './TableTooltip'

import { GoogleMeetLogo, TeamsLogo, ZoomLogo } from '~/assets/logos'

import { WarningIcon } from '~/assets/icons'
import {
    GOOGLE_MEET_NAME,
    PlatformName,
    TEAMS_NAME,
    ZOOM_NAME,
} from '~/contexts/logs/constants'
import { getPlatformFromUrl } from '~/contexts/logs/utils/search'

const getPlatformLogo = (platform: PlatformName) => {
    switch (platform) {
        case ZOOM_NAME:
            return <ZoomLogo />
        case TEAMS_NAME:
            return <TeamsLogo />
        case GOOGLE_MEET_NAME:
            return <GoogleMeetLogo />
        default:
            return <WarningIcon />
    }
}

export const PlatformCell = ({ url }: { url: string | null }) => {
    if (!url) return <WarningIcon />
    const platform = getPlatformFromUrl(url)

    return (
        <TableTooltip
            preview={getPlatformLogo(platform)}
            data={url}
            previewProps={{ justify: 'center' }}
        />
    )
}
