import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react'
import { Suspense } from 'react'
import { CookiesProvider } from 'react-cookie'
import * as ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AccountInfosProvider } from '~/hooks'
import theme from './theme'
import './theme/styles/global.css'

// Components
import { BuildInfo } from './components/BuildInfo'
import { IconViewer } from './components/IconViewer/IconViewer'
import Landing from './components/Landing'
import { Viewer } from './components/Viewer/Viewer'

// Pages
import PrivateLayout from './components/PrivateLayout'

import { ConsumptionProvider } from './contexts/consumption/ConsumptionProvider'

import { AuthProvider } from './contexts/auth/AuthProvider'
import { AuthenticatedRoute } from './contexts/auth/components/AuthenticatedRoute'
import { CredentialsProvider } from './contexts/credentials/CredentialsProvider'
import { LogsProvider } from './contexts/logs/LogsProvider'
import { SubscriptionProvider } from './contexts/subscription/SubscriptionProvider'
import { BillingPage } from './Page/BillingPage'
import { ConsumptionPage } from './Page/ConsumptionPage'
import { CredentialsPage } from './Page/CredentialsPage'
import { LoginPage } from './Page/LoginPage'
import { LogPage } from './Page/LogPage'
import { RegisterPage } from './Page/RegisterPage'
import { SEO } from './utils/Seo'

if (import.meta.env.MODE === 'prod') {
    // Disable console.log in production
    console.log = () => {}
}

function AppRoutes() {
    return (
        <Routes>
            {/* Routes publiques */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<RegisterPage />} />
            <Route path="/*" element={<Landing />} />
            {import.meta.env.DEV && (
                <Route path="icons" element={<IconViewer />} />
            )}

            {/* Routes privées avec leurs providers */}
            <Route
                element={
                    <AuthenticatedRoute>
                        <AccountInfosProvider>
                            <CredentialsProvider>
                                <LogsProvider>
                                    <SubscriptionProvider>
                                        <ConsumptionProvider>
                                            <PrivateLayout />
                                        </ConsumptionProvider>
                                    </SubscriptionProvider>
                                </LogsProvider>
                            </CredentialsProvider>
                        </AccountInfosProvider>
                    </AuthenticatedRoute>
                }
            >
                <Route path="/" element={<LogPage />} />
                <Route path="/logs" element={<LogPage />} />
                <Route path="/credentials" element={<CredentialsPage />} />
                <Route path="/usage" element={<ConsumptionPage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/version" element={<BuildInfo />} />
                <Route path="/viewer/:botId" element={<Viewer />} />
            </Route>
        </Routes>
    )
}
function App() {
    return (
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <Suspense
                    fallback={
                        <Flex
                            flexDir="column"
                            w="100vw"
                            h="100vh"
                            bg="neutral.700"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Spinner />
                        </Flex>
                    }
                >
                    <CookiesProvider>
                        <BrowserRouter
                            future={{
                                v7_startTransition: true,
                                v7_relativeSplatPath: true, // Ajout de ce flag
                            }}
                        >
                            <AuthProvider>
                                <Flex
                                    flexDir="column"
                                    w="100vw"
                                    h="100vh"
                                    bg="neutral.700"
                                >
                                    <SEO />
                                    <AppRoutes />
                                </Flex>
                            </AuthProvider>
                        </BrowserRouter>
                    </CookiesProvider>
                </Suspense>
            </ChakraProvider>
        </HelmetProvider>
    )
}

// Mount the app
const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(container)
root.render(<App />)
