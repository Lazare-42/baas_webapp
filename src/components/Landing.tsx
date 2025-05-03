import { useAccountInfos } from '~/hooks'

const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || '//'

function Landing() {
    const [accountInfos] = useAccountInfos()

    if (accountInfos.data) {
        window.location.href = `${authAppUrl}/sign-in?redirectTo=${window.location.href}`
        return null
    } else {
        const w = window as Window
        w.location.href = 'https://meetingbaas.com/'
    }

    return <></>
}

export default Landing
