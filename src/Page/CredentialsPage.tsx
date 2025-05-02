import { Container, Flex } from '@chakra-ui/react'

import { ApiAccess } from '~/components/Credentials/ApiAccess'
import { ClientWebhook } from '~/components/Credentials/ClientWebhook'
import { Layout } from '../Layout/Layout'

export const CredentialsPage = () => {
    return (
        <Layout>
            <Container
                display={'flex'}
                flexDirection={'column'}
                maxW="8xl"
                rounded={'2xl'}
                h="full"
                overflowY={'scroll'}
                gap={{ base: 4, md: 8 }}
                sx={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <Flex gap={8} flexDir="column" p="2" w="full">
                    <ApiAccess />
                    <ClientWebhook />
                </Flex>
            </Container>
        </Layout>
    )
}
