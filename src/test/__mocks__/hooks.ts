// src/test/__mocks__/hooks.ts
import { vi } from 'vitest'

// Mock du router
export const mockRouter = {
    pathname: '/test',
    push: vi.fn(),
    query: {},
    asPath: '/',
    route: '/',
}

// Mock des données d'API
export const mockRequest = {
    data: {
        api_key: 'test-key',
        webhook_url: 'https://test-webhook.com',
    },
}

export const mockUseRequireAuth = vi.fn()

// Export des hooks mockés
export const mockHooks = {
    useRouter: () => mockRouter,
    useRequest: () => mockRequest,
    useRequireAuth: mockUseRequireAuth,
}
