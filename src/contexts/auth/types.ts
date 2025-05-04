import { LoginParams, LoginResponse, RegisterParams } from '~/api'

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
    email?: string
    emailOnboarding?: string
}
