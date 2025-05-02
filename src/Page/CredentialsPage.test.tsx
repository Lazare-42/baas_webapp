import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '../test/setup'
import { CredentialsPage } from './CredentialsPage'
const mockSetWebhookUrl = vi.fn()
const mockNavigate = vi.fn()

// Mock des hooks
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

// Mock des contextes
const mockCredentialsContext = {
    apiKey: 'test-api-key',
    webhookUrl: 'https://test-webhook.com',
    setWebhookUrl: mockSetWebhookUrl,
}

vi.mock('~/contexts/credentials/CredentialsContext', () => ({
    useCredentials: () => mockCredentialsContext,
}))

// Mock du contexte d'authentification
const mockAuthContext = {
    user: { id: '1', email: 'test@test.com' },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    loginRedirect: vi.fn(),
}

vi.mock('~/contexts/auth/AuthContext', () => ({
    useAuth: () => mockAuthContext,
    AuthProvider: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
    ),
}))

// Mock du Layout
vi.mock('../Layout/Layout', () => ({
    Layout: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
}))

// Wrapper avec tous les providers nécessaires
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
        <ChakraProvider>{children}</ChakraProvider>
    </BrowserRouter>
)

describe('CredentialsPage', () => {
    describe('API Access Section', () => {
        it('should hide API key by default and show it when toggled', async () => {
            render(
                <TestWrapper>
                    <CredentialsPage />
                </TestWrapper>,
            )

            const maskedKey = await screen.findByText(
                'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            )
            expect(maskedKey).toBeInTheDocument()

            const toggleButton = await screen.findByLabelText(
                'Toggle API Key visibility',
            )
            fireEvent.click(toggleButton)

            const visibleKey = await screen.findByText('test-api-key')
            expect(visibleKey).toBeInTheDocument()
        })
    })

    describe('Webhook Section', () => {
        it('should validate webhook URL', async () => {
            render(
                <TestWrapper>
                    <CredentialsPage />
                </TestWrapper>,
            )

            const editButton = await screen.findByLabelText('Edit webhook')
            fireEvent.click(editButton)

            const input = screen.getByPlaceholderText(
                'https://your-webhook-url.com',
            )
            fireEvent.change(input, { target: { value: 'invalid-url' } })

            const errorMessage = await screen.findByText(
                'It looks like your webhook URL is invalid',
            )
            expect(errorMessage).toBeInTheDocument()
        })
    })
})
