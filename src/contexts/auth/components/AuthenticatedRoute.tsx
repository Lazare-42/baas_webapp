import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { checkJwt, getAuthSession } from '~/api/account/routes'
import { Flex, Spinner } from '@chakra-ui/react'

const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || '//'
const PUBLIC_PATHS = ['/'] as const

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
                    // Additional check to verify JWT with backend
                    await checkJwt()
                    auth.setIsAuthenticated(true)
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
        const current = encodeURIComponent(window.location.href)
        window.location.replace(`${authAppUrl}/sign-in?redirectTo=${current}`)
        return null
    }

    return <>{children}</>
}
