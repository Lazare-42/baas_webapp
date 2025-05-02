export const ERROR_TYPES = {
    // Meeting-specific errors
    MEETING_ERRORS: {
        CannotJoinMeeting: 'Cannot Join Meeting',
        TimeoutWaitingToStart: 'Meeting Start Timeout',
        BotNotAccepted: 'Bot Not Accepted',
        InvalidMeetingUrl: 'Invalid Meeting URL',
        InternalError: 'Internal Error',
        AlreadyStarted: 'Meeting Already Started',
    },
    // Webhook errors
    WEBHOOK_ERRORS: {
        'error sending webhook': 'Webhook Error',
        'webhook status: error': 'Webhook Error',
        'builder error': 'Webhook Config Error',
        'error sending request': 'Webhook Connection Error',
    },
    // HTTP status codes
    HTTP_STATUS: {
        '400': 'Bad Request',
        '401': 'Unauthorized',
        '403': 'Forbidden',
        '404': 'Not Found',
        '405': 'Method Not Allowed',
        '408': 'Request Timeout',
        '429': 'Too Many Requests',
        '500': 'Internal Server Error',
        '502': 'Bad Gateway',
        '503': 'Service Unavailable',
        '504': 'Gateway Timeout',
    },
} as const
