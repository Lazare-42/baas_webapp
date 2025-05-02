import { LoginParams, LoginResponse, RegisterParams } from '~/api'

export type AuthContextType = {
    isAuthenticated: boolean
    setIsAuthenticated: (value: boolean) => void
    email?: string
    emailOnboarding?: string
    logout: () => Promise<void>
    microsoftLogin: (
        microsoft_token_id: string,
        redirect_url: string,
        app_signin_token?: string,
    ) => Promise<string>
    login: (param: LoginParams) => Promise<LoginResponse>
    register: (param: RegisterParams) => Promise<string>
    loginRedirect: (toOnboarding?: boolean) => Promise<void>
}
