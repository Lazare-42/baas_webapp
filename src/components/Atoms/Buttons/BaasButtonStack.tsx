import { Box, Button, ButtonProps } from '@chakra-ui/react'
import React, { useState } from 'react'

export const BaasButtonStack: React.FC<
    ButtonProps & { isActive?: boolean; squareButton?: boolean }
> = ({ squareButton = false, ...props }) => {
    const [isClicked, setIsClicked] = useState(false)

    const toggleAnimation = () => {
        setIsClicked(!isClicked)
    }

    return (
        <Box
            position="relative"
            bottom="4px"
            zIndex={10}
            minWidth="fit-content"
            minHeight="fit-content"
            alignItems="center"
            justifyContent="center"
            height={'fit-content'}
        >
            <Button
                onClick={toggleAnimation}
                variant="unstyled"
                fontFamily={'baasHeading'}
                fontWeight={700}
                px={{ base: 2, lg: 4 }}
                py={1}
                rounded={!squareButton ? 'full' : 'lg'}
                border="1px"
                borderColor="primary.700"
                bg={'primary.500'}
                color="neutral.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="full"
                transition="transform 0.3s ease-in-out"
                fontSize={{ base: 'sm', lg: 'md' }}
                _hover={{
                    transform: isClicked
                        ? 'translateY(8px)'
                        : 'translateY(4px)',
                    cursor: 'pointer',
                }}
                {...props}
            />

            <Box
                position="absolute"
                top="6px"
                zIndex={-1}
                width="full"
                height="full"
                rounded={!squareButton ? 'full' : 'lg'}
                overflow="hidden"
                border="1px"
                borderColor="primary.500"
                boxShadow="primary.700"
            />
        </Box>
    )
}
