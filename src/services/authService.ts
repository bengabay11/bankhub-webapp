// authService.ts

import axios from 'axios';
import { LoginDto, LoginResponse, RegisterDto } from '../models/authModels';

const API_BASE = 'http://localhost:5209/api';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const authService = {
    async login(data: LoginDto): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>(
            `${API_BASE}/login`,
            data
        );
        const { token, refreshToken } = response.data;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        return response.data;
    },

    async register(data: RegisterDto): Promise<void> {
        await axios.post(`${API_BASE}/Register`, data);
    },

    async logout(): Promise<void> {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        // optionally call backend to revoke token
    },

    async isTokenExpired(): Promise<boolean> {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp;
            const now = Math.floor(Date.now() / 1000);
            return now >= exp;
        } catch (err) {
            console.log(err);
            return true;
        }
    },

    async refreshToken(): Promise<void> {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post<LoginResponse>(
            `${API_BASE}/refresh`,
            { refreshToken }
        );
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    },

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },
};
