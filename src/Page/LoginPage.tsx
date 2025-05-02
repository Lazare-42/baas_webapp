import {
    Box,
    Center,
    Divider,
    Flex,
    Heading,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useAuth } from '~/contexts/auth/AuthContext'

import { CredentialResponse } from '@react-oauth/google'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as ReactLink } from 'react-router-dom'
import { GoogleAuth } from '../components/Account/GoogleMeetingBaas'
import { BaasButtonStack } from '../components/Atoms/Buttons/BaasButtonStack'
import { BaasInput } from '../components/Atoms/Input/BaasInput'
import { popupError } from '../components/Atoms/PopupError/popupError'

export const LoginPage = () => {
    const { t } = useTranslation()
    const auth = useAuth()

    const [, setClicked] = useState(false)

    async function login(
        username: string,
        password: string,
        google_token_id?: string,
    ) {
        try {
            setClicked(true)
            await auth?.login({
                pseudo: username,
                password,
                google_token_id,
            })

            await auth?.loginRedirect(false)
        } catch (error) {
            popupError(error, t)
        } finally {
            setClicked(false)
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
            <Center flexDir={'column'} w="full" maxW="2xl" p="4" gap="6">
                <Heading
                    color={'neutral.50'}
                    fontFamily={'baasHeading'}
                    fontWeight={'black'}
                >
                    {import.meta.env.VITE_PROFILE === 'preprod' ||
                    import.meta.env.VITE_PROFILE === 'development' ? (
                        <>
                            <Text>Login into meeting Baas preprod</Text>
                            <Text>
                                <em>Just baas, no bullshit</em>
                            </Text>
                        </>
                    ) : (
                        'Login into meeting Baas'
                    )}
                </Heading>

                <GoogleAuth
                    shape="circle"
                    width={'350px'}
                    preCheck={() => true}
                    successCallback={(
                        google_token_id: CredentialResponse['credential'],
                    ) => {
                        login('', '', google_token_id)
                    }}
                    authType={'login'}
                />
                <Divider
                    borderColor={'neutral.400'}
                    rounded={'full'}
                    maxW={'full'}
                    w="400px"
                />
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(values, actions) => {
                        console.log('values', values)
                        login(values.email, values.password).finally(() => {
                            actions.setSubmitting(false)
                        })
                    }}
                >
                    {(formikProps) => (
                        <VStack gap="4px" as={Form}>
                            <VStack w="350px" maxW={'full'} gap="1">
                                <Field name={'email'}>
                                    {({ field }: any) => (
                                        <BaasInput
                                            {...field}
                                            id="email" // Ajout d'un id
                                            aria-label="email" // Ajout d'un aria-label
                                            headerContent="Email"
                                            type="email"
                                        />
                                    )}
                                </Field>
                                <Field name={'password'}>
                                    {({ field }: any) => (
                                        <BaasInput
                                            {...field}
                                            id="password" // Ajout d'un id
                                            aria-label="password" // Ajout d'un aria-label
                                            headerContent="Password"
                                            type="password"
                                        />
                                    )}
                                </Field>
                            </VStack>
                            <BaasButtonStack
                                isLoading={formikProps.isSubmitting}
                                type="submit"
                                maxW={'full'}
                                width={'350px'}
                                py="4"
                                px="8"
                                aria-label="login-button" // Ajout d'un aria-label
                            >
                                Login
                            </BaasButtonStack>
                            <Flex
                                justifyContent={'flex-end'}
                                w="full"
                                fontFamily={'baasBody'}
                                fontSize={'sm'}
                            >
                                <Box w="full" mt="6px" textAlign="right">
                                    {`Don’t have an account yet? `}
                                    <Link as={ReactLink} to={'/signup'}>
                                        {`Sign up.`}
                                    </Link>
                                </Box>
                            </Flex>
                        </VStack>
                    )}
                </Formik>
            </Center>
        </Center>
    )
}
