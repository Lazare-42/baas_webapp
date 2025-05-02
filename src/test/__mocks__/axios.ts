import { vi } from 'vitest'

export default {
    defaults: {
        baseURL: '//',
        withCredentials: true,
        headers: {
            common: {},
        },
    },
    create: vi.fn().mockReturnValue({
        get: vi.fn(),
        post: vi.fn(),
    }),
    post: vi.fn().mockResolvedValue({ data: { success: true } }),
    get: vi.fn().mockResolvedValue({ data: { success: true } }),
}
