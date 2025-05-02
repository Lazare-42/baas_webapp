import {
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider,
} from '@react-oauth/google'

import { Flex } from '@chakra-ui/react'
import React from 'react'

const GOOGLE_CLIENT_ID =
    '705001988400-v3bpopfmcn8r83u5b8dh8eiq63452j90.apps.googleusercontent.com'

type GoogleAuthProps = {
    preCheck: () => boolean
    successCallback: (google_token_id: CredentialResponse['credential']) => void
    authType: 'register' | 'login'
} & Omit<React.ComponentProps<typeof GoogleLogin>, 'onSuccess' | 'onError'>

export const GoogleAuth = (props: GoogleAuthProps) => {
    const { preCheck, successCallback, ...googleLoginProps } = props

    function responseGoogle(r: CredentialResponse) {
        if (!preCheck()) {
            console.log('Pre-check failed')
            return
        }
        console.log({ r })
        console.log('credential: ', r.credential)
        successCallback(r.credential)
    }

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID as string}>
            <Flex mb="16px">
                <GoogleLogin
                    {...googleLoginProps}
                    onSuccess={responseGoogle}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                    useOneTap={false}
                    type="standard"
                />
            </Flex>
        </GoogleOAuthProvider>
    )
}
