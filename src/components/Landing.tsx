import { useAccountInfos } from '~/hooks'
import { getSignInUrl } from '~/utils/authAppUrl'

function Landing() {
    const [accountInfos] = useAccountInfos()

    if (accountInfos.data) {
        const signInUrl = getSignInUrl()
        window.location.replace(signInUrl)
        // Returning null to avoid rendering anything while redirecting to auth app
        return null
    } else {
        const w = window as Window
        w.location.href = 'https://meetingbaas.com/'
    }

    return <></>
}

export default Landing
