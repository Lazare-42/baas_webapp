import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { checkJwt, getAuthSession } from '~/api/account/routes'
import { Flex, Spinner } from '@chakra-ui/react'

const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || '//'
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
                const session = await getAuthSession()
                if (session) {
                    // Au lieu d'appeler login, on met à jour directement isAuthenticated
                    auth.setIsAuthenticated(true)
                    // This is not required anymore since get session would also verify the session
                    try {
                        const jwt = await checkJwt()
                        console.log(jwt)
                    } catch (e) {
                        console.error('Error checking jwt', e)
                    }
                } else {
                    auth.setIsAuthenticated(false)
                }
            } catch (error) {
                auth.setIsAuthenticated(false)
            } finally {
                setIsLoading(false)
            }
        }

        verifyAuth()
    }, [auth])

    if (isLoading) {
        return (
            <Flex
                flexDir="column"
                w="100vw"
                h="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner color="teal.500" />
            </Flex>
        )
    }

    if (!auth.isAuthenticated && !isPublicRoute) {
        window.location.href = `${authAppUrl}/sign-in?redirectTo=${window.location.href}`
        return null
    }

    if (auth.isAuthenticated && location.pathname === '/login') {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
