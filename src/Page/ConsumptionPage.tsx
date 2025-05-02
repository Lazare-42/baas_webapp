import { Container } from '@chakra-ui/react'
import { Layout } from '../Layout/Layout'
import { ConsumptionChart } from '../components/Consumption/ConsumptionChart'

// ConsumptionPage.tsx
export const ConsumptionPage = () => {
    return (
        <Layout>
            <Container
                display={'flex'}
                flexDirection={'column'}
                maxW="8xl"
                rounded={'2xl'}
                h="full"
                overflowY={'scroll'}
                gap={{ base: 4, md: 8 }}
                sx={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <ConsumptionChart />
            </Container>
        </Layout>
    )
}
