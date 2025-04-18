import axios from 'axios';
import { LoginDto, LoginResponse, RegisterDto } from '../models/authModels';
import { tokenService } from './tokenService';

const API_BASE = 'http://localhost:5209/api';

export const authService = {
    async login(data: LoginDto): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>(
            `${API_BASE}/login`,
            data
        );
        const { token, refreshToken } = response.data;
        tokenService.setAccessToken(token);
        tokenService.setRefreshToken(refreshToken);
        return response.data;
    },

    async register(data: RegisterDto): Promise<void> {
        await axios.post(`${API_BASE}/Register`, data);
    },

    async logout(): Promise<void> {
        tokenService.clearTokens();
    },

    async refreshToken(): Promise<void> {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post<LoginResponse>(
            `${API_BASE}/refresh`,
            { refreshToken }
        );
        tokenService.setAccessToken(response.data.token);
        tokenService.setRefreshToken(response.data.refreshToken);
    },
};
