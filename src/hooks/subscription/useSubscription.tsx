import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const usePaymentStatus = () => {
    const location = useLocation()
    const toast = useToast()

    useEffect(() => {
        const handlePaymentStatus = () => {
            const searchParams = new URLSearchParams(location.search)
            const payment = searchParams.get('payment')

            if (payment === 'cancelled') {
                toast({
                    title: 'Payment cancelled',
                    variant: 'error',
                    description:
                        'Your payment was not completed. Please try again.',
                    duration: 7000,
                    containerStyle: {
                        borderRadius: 'lg',
                        bg: 'error.500',
                        color: 'neutral.900',
                    },
                    isClosable: true,
                    position: 'top-right',
                })
            } else if (payment === 'success') {
                toast({
                    title: 'Payment successful',
                    description: 'Your payment was successful. Thank you!',
                    containerStyle: {
                        borderRadius: 'lg',
                        bg: 'primary.500',
                        color: 'neutral.900',
                    },
                    variant: 'success',
                    duration: 7000,
                    isClosable: true,
                    position: 'top-right',
                })
            }
        }
        handlePaymentStatus()
    }, [location, toast])
}
