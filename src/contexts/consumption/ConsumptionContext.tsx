import { createContext, useContext } from 'react'
import { ConsumptionContextType } from './types/types'

const ConsumptionContext = createContext<ConsumptionContextType | undefined>(
    undefined,
)

export const useConsumption = () => {
    const context = useContext(ConsumptionContext)
    if (!context) {
        throw new Error(
            'useConsumption must be used within a ConsumptionProvider',
        )
    }
    return context
}

export { ConsumptionContext }
