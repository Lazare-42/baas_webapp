import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { checkJwt } from '~/api/account/routes'

const PUBLIC_PATHS = ['/login', '/signup', '/'] as const

export function AuthenticatedRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const location = useLocation()
    const auth = useAuth()
    const [isLoading, setIsLoading] = useState(true)

    const isPublicRoute = PUBLIC_PATHS.includes(
        location.pathname as (typeof PUBLIC_PATHS)[number],
    )

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const token = localStorage.getItem('auth_token')
                if (token) {
                    await checkJwt()
                    // Au lieu d'appeler login, on met à jour directement isAuthenticated
                    auth.setIsAuthenticated(true)
                } else {
                    auth.setIsAuthenticated(false)
                }
            } catch (error) {
                localStorage.removeItem('auth_token')
                auth.setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }

        verifyAuth()
    }, [auth])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!auth.isAuthenticated && !isPublicRoute) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if (auth.isAuthenticated && location.pathname === '/login') {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
