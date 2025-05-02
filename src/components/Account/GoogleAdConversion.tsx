import { useEffect } from 'react'

export const GoogleAdConversion = () => {
    useEffect(() => {
        const script = document.createElement('script')
        script.innerHTML = `
      gtag('event', 'conversion', {'send_to': 'AW-580049802/LEtKCOvxn9MZEIq3y5QC'});
    `
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return null
}
