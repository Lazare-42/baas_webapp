import { Outlet, useLocation } from 'react-router-dom'
import { useAccountInfos } from '~/hooks'
import { Layout } from '~/Layout/Layout'

const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || '//'

const PrivateLayout = () => {
    const [account] = useAccountInfos()
    const location = useLocation()

    if (account.isLoading) {
        return <Layout children={<></>} />
    }

    if (!account.data) {
        window.location.href = `${authAppUrl}/sign-in?redirectTo=${window.location.href}`
        return null
    }

    return <Outlet />
}

export default PrivateLayout
