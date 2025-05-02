import { Box, Button, ButtonProps } from '@chakra-ui/react'

export const HamburgerMenu = ({
    isOpen,
    setIsOpen,
    ...buttonProps
}: ButtonProps & {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <Button
            title={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen(!isOpen)}
            h="40px"
            w="40px"
            minH="40px"
            minW="40px"
            bg="neutral.500"
            borderRadius="md"
            boxShadow="md"
            position="relative"
            color={'neutral.50'}
            _hover={{ bg: 'primary.700', color: 'neutral.500' }}
            {...buttonProps}
        >
            <Box
                position="absolute"
                width="20px"
                height="16px"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Box
                    as="span"
                    position="absolute"
                    h="2px"
                    w="20px"
                    bg="primary.500"
                    rounded={'full'}
                    top="0"
                    left="0"
                    transition="all 0.3s ease"
                    transform={
                        isOpen ? 'translateY(7px) rotate(45deg)' : 'none'
                    }
                />
                <Box
                    as="span"
                    position="absolute"
                    h="2px"
                    rounded={'full'}
                    w="20px"
                    bg="neutral.50"
                    top="7px"
                    left="0"
                    transition="all 0.3s ease"
                    opacity={isOpen ? 0 : 1}
                />
                <Box
                    as="span"
                    position="absolute"
                    rounded={'full'}
                    h="2px"
                    w="20px"
                    bg="primary.500"
                    top="14px"
                    left="0"
                    transition="all 0.3s ease"
                    transform={
                        isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'
                    }
                />
            </Box>
        </Button>
    )
}
