import {
    Box,
    Center,
    Divider,
    Flex,
    Spacer,
    useDisclosure,
} from '@chakra-ui/react'
import {
    EmbedIcon,
    ExitIcon,
    IntegrationIcon,
    LongTextIcon,
    MoneyWithdrawalIcon,
    PlanIcon,
} from '~/assets/icons'
import { useRouter } from '~/hooks'

import { logoutApi } from '~/api'
import { BaasLogoName } from '~/assets/logos/BaasLogoName'
import { BaasButton } from '../Atoms/Buttons/BaasButton'
import { HamburgerMenu } from '../Atoms/Buttons/HamburgerMenu'

export const Menu = () => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Flex
            bg="neutral.700"
            flexDir="column"
            h={{ base: isOpen ? 'full' : 'fit-content', lg: 'full' }}
            maxH="full"
            position={{ base: 'fixed', lg: 'relative' }}
            zIndex={100}
            w={{
                base: isOpen ? 'full' : 'fit-content',
                lg: '220px',
                '2xl': '270px',
            }}
            color="neutral.400"
            borderRight={'1px'}
            borderRightColor={{
                base: 'neutral.700',
                lg: 'neutral.500',
            }}
            gap="2"
            p="3"
        >
            <Center width="full" display={{ base: 'none', lg: 'center' }}>
                <Flex
                    pt="4"
                    pb="8"
                    align="center"
                    justify="center"
                    fontSize="xl"
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                    w="167px"
                    height="fit-content"
                    color="neutral.50"
                    onClick={() =>
                        window.open('https://meetingbaas.com', '_self')
                    }
                >
                    <BaasLogoName color={'primary.500'} />
                </Flex>
            </Center>
            <HamburgerMenu
                isOpen={isOpen}
                setIsOpen={onToggle}
                cursor={'pointer'}
                display={{ base: 'flex', lg: 'none' }}
            />
            <Box
                height={'full'}
                w="full"
                display={{
                    base: isOpen ? 'block' : 'none',
                    lg: 'flex',
                }}
                flexDir={'column'}
            >
                <InnerMenu />
            </Box>
        </Flex>
    )
}

const InnerMenu = () => {
    const router = useRouter()

    return (
        <Flex flexDir={'column'} gap="2" w="full" flexGrow={1}>
            <BaasButton
                leftIcon={<EmbedIcon color={'primary.500'} />}
                onClick={() => {
                    console.log('Icon clicked')
                    window.open(
                        'https://doc.meetingbaas.com/',
                        '_blank',
                        'noopener,noreferrer',
                    )
                }}
            >
                Documentation
            </BaasButton>
            <Divider
                borderColor={'transparent'}
                bg={'neutral.500'}
                h={'1px'}
                rounded={'full'}
                my={'2'}
            />
            <BaasButton
                isActive={
                    router.pathname.endsWith('baas') ||
                    router.pathname.endsWith('baas/') ||
                    router.pathname.endsWith('/baas/webhooks') ||
                    router.pathname.endsWith('/credentials')
                }
                leftIcon={
                    <IntegrationIcon color={'primary.500'} boxSize={'18px'} />
                }
                onClick={() => {
                    router.push('/credentials')
                }}
            >
                Credentials
            </BaasButton>
            <BaasButton
                isActive={
                    router.pathname === '/' || router.pathname.endsWith('logs')
                }
                leftIcon={
                    <LongTextIcon color={'primary.500'} boxSize={'18px'} />
                }
                onClick={() => {
                    router.push('/logs')
                }}
            >
                Logs
            </BaasButton>

            <BaasButton
                isActive={router.pathname.endsWith('usage')}
                onClick={() => {
                    router.push('/usage')
                }}
                leftIcon={
                    <MoneyWithdrawalIcon
                        color={'primary.500'}
                        boxSize={'18px'}
                    />
                }
            >
                Usage
            </BaasButton>
            <BaasButton
                isActive={router.pathname.endsWith('billing')}
                leftIcon={<PlanIcon color={'primary.500'} boxSize={'18px'} />}
                onClick={() => {
                    router.push('/billing')
                }}
            >
                Billing
            </BaasButton>

            <Spacer />
            <BaasButton
                onClick={async () => {
                    await logoutApi()
                    window.location.href = '/'
                }}
                leftIcon={<ExitIcon color="primary.500" boxSize={'18px'} />}
            >
                Logout
            </BaasButton>
        </Flex>
    )
}
