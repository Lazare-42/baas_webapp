// src/test/setup.tsx
import { ChakraProvider } from '@chakra-ui/react'
import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { expect, vi } from 'vitest'
import theme from '~/theme'

vi.mock('axios', async () => {
    const actual = await vi.importActual('axios')
    return {
        ...actual,
        default: {
            defaults: {
                baseURL: '',
                withCredentials: true,
            },
            post: vi.fn().mockResolvedValue({ data: {} }),
            get: vi.fn().mockResolvedValue({ data: {} }),
            create: vi.fn(),
            interceptors: {
                request: { use: vi.fn(), eject: vi.fn() },
                response: { use: vi.fn(), eject: vi.fn() },
            },
        },
    }
})

expect.extend(matchers)

const customRender = (ui: ReactElement, options = {}) => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    )

    return render(ui, {
        wrapper: Wrapper,
        ...options,
    })
}

export * from '@testing-library/react'
export { customRender as render }
