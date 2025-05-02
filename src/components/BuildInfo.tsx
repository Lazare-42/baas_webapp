import { Center, Heading } from '@chakra-ui/react'

import buildInfo from '../buildInfo.json'

export const BuildInfo = () => {
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
                <Heading color={'neutral.50'} fontWeight={'black'}>
                    Date de build{' '}
                    {new Date(buildInfo.buildDate).toLocaleString()}
                </Heading>
            </Center>
        </Center>
    )
}
