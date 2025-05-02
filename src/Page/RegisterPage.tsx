import { Center, Checkbox, Heading, Link } from '@chakra-ui/react'

import { CredentialResponse } from '@react-oauth/google'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GoogleAdConversion } from '~/components/Account/GoogleAdConversion'
import { useAuth } from '~/contexts/auth/AuthContext'
import { GoogleAuth } from '../components/Account/GoogleMeetingBaas'
import { popupError } from '../components/Atoms/PopupError/popupError'

export const RegisterPage = () => {
    const { t } = useTranslation()
    const auth = useAuth()

    const [tosAccepted, setTosAccepted] = useState(false)
    const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false)

    async function register(mail: string, google_token_id?: string) {
        console.log('register')
        try {
            await auth?.register({ email: mail, google_token_id })
        } catch (error) {
            popupError(error, t)
        }
    }
    async function onSubmitGoogle(
        google_token_id: CredentialResponse['credential'],
    ) {
        if (!tosAccepted || !privacyPolicyAccepted) {
            popupError(
                new Error(
                    'Please accept the Terms of Service and Privacy Policy',
                ),
                t,
            )
            return
        }

        try {
            await register('', google_token_id)
            await auth?.loginRedirect(false)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Center
            h="full"
            w="full"
            flexDir={'column'}
            bg="neutral.700"
            color="neutral.50"
            overflowY={'scroll'}
        >
            {import.meta.env.VITE_PROFILE === 'prod' && <GoogleAdConversion />}

            <Center flexDir={'column'} w="full" maxW="2xl" p="4" gap="6">
                <Heading color={'neutral.50'} fontWeight={'black'}>
                    Signup to Meeting Baas 🐟
                </Heading>

                <GoogleAuth
                    shape="circle"
                    width={'350px'}
                    preCheck={() => tosAccepted && privacyPolicyAccepted}
                    successCallback={(
                        google_token_id: CredentialResponse['credential'],
                    ) => {
                        onSubmitGoogle(google_token_id)
                    }}
                    authType={'register'}
                />

                <Checkbox
                    isChecked={tosAccepted}
                    onChange={(e) => setTosAccepted(e.target.checked)}
                >
                    {t('I agree')}{' '}
                    <Link
                        as="a"
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('to the terms of use of Meeting Baas')}
                    </Link>
                </Checkbox>
                <Checkbox
                    isChecked={privacyPolicyAccepted}
                    onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                >
                    {t('I consent')}{' '}
                    <Link
                        as="a"
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {t('to the privacy policy of Meeting Baas')}
                    </Link>
                </Checkbox>
            </Center>
        </Center>
    )
}
