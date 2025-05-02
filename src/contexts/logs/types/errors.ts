type ErrorType = 'error' | 'warning' | 'info'

export interface ErrorInfo {
    text: string
    type: ErrorType
}
