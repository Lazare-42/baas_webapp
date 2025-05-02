import { useState } from 'react'
import { useRouter } from '~/hooks/useRouter'

import {
    loginApi,
    LoginParams,
    logoutApi,
    RegisterParams,
    signupApi,
} from '~/api'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    async function login(param: LoginParams) {
        const response = await loginApi(param)
        localStorage.setItem('auth_token', response.token)
        setIsAuthenticated(true)
        return response
    }

    async function logout() {
        try {
            await logoutApi()
            localStorage.removeItem('auth_token')
            setIsAuthenticated(false)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    async function loginRedirect() {
        if (router.query.redirect_url) {
            window.location.href = router.query.redirect_url
        } else {
            router.push('/')
        }
    }

    async function microsoftLogin(
        microsoft_token_id: string,
        redirect_url: string,
        app_signin_token?: string,
    ) {
        return (
            await login({
                pseudo: '',
                password: '',
                microsoft_token_id,
                app_signin_token,
            })
        ).token
    }

    async function register(param: RegisterParams): Promise<string> {
        const params = `?redirect_url=${param.redirect_url}${
            router.pathname.includes('/') ? '&bots' : ''
        }`
        const token = await signupApi(
            {
                ...param,
                lang: navigator.language,
            },
            params,
        )
        setIsAuthenticated(true)
        return token.token
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                logout,
                loginRedirect,
                microsoftLogin,
                login,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
