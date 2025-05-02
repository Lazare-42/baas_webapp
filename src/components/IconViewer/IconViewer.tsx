// Importer toutes les icônes depuis le fichier index.ts
import * as IconComponents from '~/assets/icons'
import * as LogoComponents from '~/assets/logos'

import {
    Box,
    Center,
    Grid,
    Heading,
    IconProps,
    Text,
    VStack,
} from '@chakra-ui/react'

import React from 'react'

type IconComponent = React.FC<IconProps>

interface IconInfo {
    slug: string
    module: IconComponent
}

export const IconViewer: React.FC = () => {
    const icons: IconInfo[] = Object.entries(IconComponents).map(
        ([name, Component]) => ({
            slug: name,
            module: Component as IconComponent,
        }),
    )
    const logos: IconInfo[] = Object.entries(LogoComponents).map(
        ([name, Component]) => ({
            slug: name,
            module: Component as IconComponent,
        }),
    )
    return (
        <VStack gap={'8px'} w="full">
            <Heading>Logos</Heading>
            <IconGrid icons={logos} />
            <Heading>Icons</Heading>
            <IconGrid icons={icons} />
        </VStack>
    )
}

const IconGrid = ({ icons }: { icons: IconInfo[] }) => {
    return (
        <Grid
            templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
            gap={8}
            w="full"
        >
            {icons.map((icon, index) => (
                <VStack key={index}>
                    <Center w={'24px'} h="24px">
                        <Box as={icon.module} />
                    </Center>

                    <Text mt={2} textAlign="center">
                        {icon.slug}
                    </Text>
                </VStack>
            ))}
        </Grid>
    )
}
