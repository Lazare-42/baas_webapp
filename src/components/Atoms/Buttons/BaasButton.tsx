import { Button, ButtonProps, Text } from '@chakra-ui/react'

export const BaasButton: React.FC<ButtonProps & { isActive?: boolean }> = ({
    children,
    rightIcon,

    ...props
}) => {
    return (
        <Button
            fontFamily={'baasBody'}
            fontSize={'md'}
            _active={{ color: 'primary.500', bg: 'neutral.500' }}
            color="neutral.50"
            variant="unstyled"
            _hover={{ bg: 'primary.700', color: 'neutral.50' }}
            fontWeight="medium"
            px="2"
            rounded="md"
            width={'full'}
            h="8"
            justifyContent={'flex-start'}
            display="flex"
            rightIcon={rightIcon}
            {...props}
        >
            <Text>{children}</Text>
        </Button>
    )
}
