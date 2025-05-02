import { vi } from 'vitest'

export const BASE_URL = '//'
export const setDefaultHeader = vi.fn()
export const cached = {
    get: vi.fn(),
    post: vi.fn(),
}
