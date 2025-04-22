import axios from 'axios';
import { tokenService } from './tokenService';

export const api = axios.create({
    baseURL: 'http://localhost:5209/',
});

api.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
