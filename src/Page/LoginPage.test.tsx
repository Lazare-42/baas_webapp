import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test/setup'
import { LoginPage } from './LoginPage'

// Mock des hooks
const mockLogin = vi.fn()
const mockLoginRedirect = vi.fn()

// Correction du mock pour correspondre au chemin d'import réel
vi.mock('~/contexts/auth/AuthContext', () => ({
    useAuth: () => ({
        login: mockLogin,
        loginRedirect: mockLoginRedirect,
    }),
}))

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (str: string) => str,
    }),
}))

vi.mock('../components/Atoms/PopupError/popupError', () => ({
    popupError: vi.fn(),
}))

// Mock de GoogleAuth
vi.mock('../components/Account/GoogleMeetingBaas', () => ({
    GoogleAuth: ({ successCallback }: any) => (
        <button onClick={() => successCallback('mock-google-token')}>
            Google Auth Button
        </button>
    ),
}))

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders login form correctly', () => {
        renderWithRouter(<LoginPage />)

        expect(screen.getByLabelText('email')).toBeInTheDocument()
        expect(screen.getByLabelText('password')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /login/i }),
        ).toBeInTheDocument()
    })

    it('handles form submission correctly', async () => {
        mockLogin.mockResolvedValueOnce({})
        mockLoginRedirect.mockResolvedValueOnce({})

        renderWithRouter(<LoginPage />)

        const emailInput = screen.getByLabelText('email')
        const passwordInput = screen.getByLabelText('password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                pseudo: 'test@test.com',
                password: 'password123',
                google_token_id: undefined,
            })
            expect(mockLoginRedirect).toHaveBeenCalledWith(false)
        })
    })

    it('handles login errors correctly', async () => {
        const error = new Error('Login failed')
        mockLogin.mockRejectedValueOnce(error)

        renderWithRouter(<LoginPage />)

        const emailInput = screen.getByLabelText('email')
        const passwordInput = screen.getByLabelText('password')
        const submitButton = screen.getByRole('button', { name: /login/i })

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
        fireEvent.change(passwordInput, { target: { value: 'wrong-password' } })
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                pseudo: 'test@test.com',
                password: 'wrong-password',
                google_token_id: undefined,
            })
            expect(mockLoginRedirect).not.toHaveBeenCalled()
        })
    })

    it('handles Google login correctly', async () => {
        mockLogin.mockResolvedValueOnce({})
        mockLoginRedirect.mockResolvedValueOnce({})

        renderWithRouter(<LoginPage />)

        const googleButton = screen.getByText('Google Auth Button')
        fireEvent.click(googleButton)

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                pseudo: '',
                password: '',
                google_token_id: 'mock-google-token',
            })
            expect(mockLoginRedirect).toHaveBeenCalledWith(false)
        })
    })
})
