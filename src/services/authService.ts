import axios from 'axios';
import { LoginDto, LoginResponse, RegisterDto } from '../models/authModels';
import { tokenService } from './tokenService';

const API_BASE = 'http://localhost:5209';

export class AuthError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'AuthError';
    }
}

export const authService = {
    async login(data: LoginDto): Promise<LoginResponse> {
        try {
            const response = await axios.post<LoginResponse>(
                `${API_BASE}/login`,
                data
            );
            const { accessToken, refreshToken, expiresIn } = response.data;
            tokenService.setTokens(accessToken, refreshToken, expiresIn);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new AuthError(
                        'Invalid email or password. Please try again.',
                        401
                    );
                } else if (error.response?.status === 429) {
                    throw new AuthError(
                        'Too many login attempts. Please try again later.',
                        429
                    );
                } else if (error.response?.status === 500) {
                    throw new AuthError(
                        'Server error. Please try again later.',
                        500
                    );
                } else if (!navigator.onLine) {
                    throw new AuthError(
                        'No internet connection. Please check your network.'
                    );
                }
            }
            throw new AuthError(
                'An unexpected error occurred. Please try again.'
            );
        }
    },

    async register(data: RegisterDto): Promise<void> {
        await axios.post(`${API_BASE}/api/Register`, data);
    },

    async logout(): Promise<void> {
        tokenService.clearTokens();
    },

    async refreshToken(): Promise<void> {
        const currentRefreshToken = tokenService.getRefreshToken();
        if (!currentRefreshToken) throw new Error('No refresh token');

        const response = await axios.post<LoginResponse>(
            `${API_BASE}/refresh`,
            { refreshToken: currentRefreshToken }
        );
        const { accessToken, refreshToken, expiresIn } = response.data;
        tokenService.setTokens(accessToken, refreshToken, expiresIn);
    },
};
