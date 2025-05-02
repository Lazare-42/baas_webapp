import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAccountInfos } from '~/hooks'
import { Layout } from '~/Layout/Layout'

const PrivateLayout = () => {
    const [account] = useAccountInfos()
    const location = useLocation()

    if (account.isLoading) {
        return <Layout children={<></>} />
    }

    if (!account.data) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}

export default PrivateLayout
