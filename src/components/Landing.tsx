import { useAccountInfos } from '~/hooks'
import { getAuthAppUrl } from '~/utils/authAppUrl'

const authAppUrl = getAuthAppUrl()

function Landing() {
    const [accountInfos] = useAccountInfos()

    if (accountInfos.data) {
        const current = encodeURIComponent(window.location.href)
        window.location.replace(`${authAppUrl}/sign-in?redirectTo=${current}`)
        return null
    } else {
        const w = window as Window
        w.location.href = 'https://meetingbaas.com/'
    }

    return <></>
}

export default Landing
