import { Box, Flex } from '@chakra-ui/react'
import { DiscordIcon, MembersIcon } from '~/assets/icons'

import { useRouter } from '~/hooks'
import { BaasButtonStack } from '../Atoms/Buttons/BaasButtonStack'

export const Header = () => {
    const router = useRouter()
    return (
        <Flex
            w="full"
            borderBottom={'1px'}
            borderBottomColor={'neutral.500'}
            alignItems={'center'}
            flexDir="row-reverse"
            py="4"
            px="2"
            gap="2"
        >
            <Box w="fit">
                <BaasButtonStack
                    isActive={router.pathname.endsWith('/baas/contact-us')}
                    rightIcon={
                        <DiscordIcon alignContent="center" boxSize={'18px'} />
                    }
                    onClick={() =>
                        window.open('https://discord.com/invite/dsvFgDTr6c')
                    }
                >
                    Join our Discord
                </BaasButtonStack>
            </Box>
            <Box w="fit">
                <BaasButtonStack
                    isActive={router.pathname.endsWith('/baas/contact-us')}
                    rightIcon={
                        <MembersIcon alignContent="center" boxSize={'18px'} />
                    }
                    onClick={() =>
                        window.open(
                            'mailto:hello@spoke.app?subject=Contact%20for%20Meeting%20Baas%20🐟&body=Hi%2C%0A%0AI%27d%20like%20to%20get%20more%20information%20on%20Meeting%20Baas.%0APlease%20state%20your%20questions%2C%20eventually%20the%20volume%20(per%20month)%20of%20hours%20you%27d%20be%20looking%20to%20use%2C%20etc',
                            '_self',
                        )
                    }
                >
                    Contact us
                </BaasButtonStack>
            </Box>
        </Flex>
    )
}
