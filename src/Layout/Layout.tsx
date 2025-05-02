import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Header } from '../components/LayoutAtoms/HeaderBaas'
import { Menu } from '../components/LayoutAtoms/MenuBaas'

export const Layout = (props: { children: ReactNode }) => {
    return (
        <Flex
            w="full"
            h="full"
            minH="100vh"
            bg="neutral.700"
            maxW={'full'}
            overflow={'clip'}
        >
            <Menu />
            <Flex
                flexGrow={1}
                flexDir={'column'}
                overflow={'clip'}
                w={{
                    base: 'full',
                    lg: 'calc(100% - 220px)',
                    '2xl': 'calc(100% - 270px)',
                }}
            >
                <Header />
                <Flex
                    flexGrow={1}
                    flexDir={'column'}
                    w="full"
                    h="full"
                    maxW={'full'}
                    overflow={'hidden'}
                    alignItems={'center'}
                    p={{ base: 2, md: 4 }}
                    rounded={'3xl'}
                >
                    {props.children}
                </Flex>
            </Flex>
        </Flex>
    )
}
