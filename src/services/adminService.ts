import axios from 'axios';
import { User } from '../models/authModels';

const API_URL = 'http://localhost:5209/api/admin'; // כתובת ה-API של הניהול

export const adminService = {
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    },

    async deleteUser(userId: string): Promise<void> {
        try {
            await axios.delete(`${API_URL}/users/${userId}`);
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    },

    async searchUserByName(name: string): Promise<User> {
        try {
            const response = await axios.get(`${API_URL}/users/search`, {
                params: { name },
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to search for user');
        }
    },

    async getUserById(userId: string): Promise<User> {
        try {
            const response = await axios.get(`${API_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user by ID');
        }
    },
};
