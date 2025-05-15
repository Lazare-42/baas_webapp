import { Outlet } from 'react-router-dom'
import { useAccountInfos } from '~/hooks'
import { Layout } from '~/Layout/Layout'
import { getSignInUrl } from '~/utils/authAppUrl'

const PrivateLayout = () => {
    const [account] = useAccountInfos()

    if (account.isLoading) {
        return <Layout children={<></>} />
    }

    if (!account.data) {
        const signInUrl = getSignInUrl()
        window.location.replace(signInUrl)
        // Returning null to avoid rendering anything while redirecting to auth app
        return null
    }

    return <Outlet />
}

export default PrivateLayout
