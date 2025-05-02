import { createContext, useContext } from 'react'
import { LogsContextType } from './types/context'

const LogsContext = createContext<LogsContextType | undefined>(undefined)

export const useLogs = () => {
    const context = useContext(LogsContext)
    if (!context) {
        throw new Error('useLogs must be used within a LogsProvider')
    }
    return context
}

export { LogsContext }
