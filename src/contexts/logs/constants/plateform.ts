export const ZOOM_NAME = 'Zoom'
export const TEAMS_NAME = 'Microsoft Teams'
export const GOOGLE_MEET_NAME = 'Google Meet'
export const UNKNOWN_NAME = 'Unknown Platform?'

export type PlatformName =
    | typeof ZOOM_NAME
    | typeof TEAMS_NAME
    | typeof GOOGLE_MEET_NAME
    | typeof UNKNOWN_NAME
