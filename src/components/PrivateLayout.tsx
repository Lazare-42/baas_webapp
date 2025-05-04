import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAccountInfos } from '~/hooks'
import { Layout } from '~/Layout/Layout'

const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || '//'

const PrivateLayout = () => {
    const [account] = useAccountInfos()

    if (account.isLoading) {
        return <Layout children={<></>} />
    }

    useEffect(() => {
        if (!account.data) {
            const current = encodeURIComponent(window.location.href)
            window.location.replace(
                `${authAppUrl}/sign-in?redirectTo=${current}`,
            )
        }
    }, [account.data])

    if (!account.data) {
        // Return null to avoid rendering anything while redirecting to auth app
        return null
    }

    return <Outlet />
}

export default PrivateLayout
