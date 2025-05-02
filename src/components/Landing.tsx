import { useAccountInfos } from '~/hooks'

import { Navigate } from 'react-router-dom'

function Landing() {
    const [accountInfos] = useAccountInfos()

    if (accountInfos.data) {
        return <Navigate to="/login" />
    } else {
        const w = window as Window
        w.location.href = 'https://meetingbaas.com/'
    }

    return <></>
}

export default Landing
