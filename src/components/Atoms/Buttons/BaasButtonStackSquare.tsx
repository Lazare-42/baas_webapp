import { Box, IconButton, IconButtonProps, Square } from '@chakra-ui/react'
import React, { useState } from 'react'

export const BaasButtonStackSquare: React.FC<
    IconButtonProps & { isActive?: boolean; squareButton?: boolean }
> = ({ children, squareButton = false, ...props }) => {
    const [isClicked, setIsClicked] = useState(false)

    const toggleAnimation = () => {
        setIsClicked(!isClicked)
    }

    return (
        <Square
            position="relative"
            bottom="4px"
            zIndex={10}
            minWidth="fit-content"
            minHeight="fit-content"
            alignItems="center"
            justifyContent="center"
        >
            <IconButton
                onClick={toggleAnimation}
                variant="unstyled"
                fontWeight="bold"
                textTransform="uppercase"
                rounded={!squareButton ? 'full' : 'lg'}
                border="1px"
                borderColor="primary.500"
                bg={'neutral.700'}
                color="primary.500"
                display="flex"
                alignItems="center"
                alignContent={'center'}
                justify="center"
                justifyContent="center"
                width="full"
                transition="transform 0.3s ease-in-out"
                _hover={{
                    transform: isClicked
                        ? 'translateY(8px)'
                        : 'translateY(4px)',
                    cursor: 'pointer',
                }}
                {...props}
            >
                {children}
            </IconButton>
            <Box
                position="absolute"
                top="4px"
                zIndex={-1}
                width="full"
                height="full"
                rounded={'lg'}
                overflow="hidden"
                bg={'primary.700'}
                border="1px"
                borderColor="primary.500"
            />
        </Square>
    )
}
