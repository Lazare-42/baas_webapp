import { createContext, useContext } from 'react'
import { CredentialsContextType } from './types/context'

const CredentialsContext = createContext<CredentialsContextType | undefined>(
    undefined,
)

export const useCredentials = () => {
    const context = useContext(CredentialsContext)
    if (!context) {
        throw new Error(
            'useConsumption must be used within a ConsumptionProvider',
        )
    }
    return context
}

export { CredentialsContext }
