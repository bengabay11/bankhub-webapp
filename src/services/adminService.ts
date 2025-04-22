import api from './serverApi';
import { FullUserDetails } from '../models/userModels';

const ADMIN_ENDPOINT = '/admin/users';

export const adminService = {
    async getAllUsers(): Promise<FullUserDetails[]> {
        try {
            const response = await api.get<FullUserDetails[]>(ADMIN_ENDPOINT);
            return response.data;
        } catch (error: any) {
            throw new Error('Failed to fetch users');
        }
    },

    async getUserById(id: string): Promise<FullUserDetails> {
        try {
            const response = await api.get<FullUserDetails>(
                `${ADMIN_ENDPOINT}/${id}`
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('User not found');
            }
            throw new Error('Failed to fetch user');
        }
    },

    async deleteUser(id: string): Promise<void> {
        try {
            await api.delete(`${ADMIN_ENDPOINT}/${id}`);
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error('User not found');
            }
            throw new Error('Failed to delete user');
        }
    },

    async searchUserByName(name: string): Promise<FullUserDetails> {
        try {
            const response = await api.get<FullUserDetails>(
                `${ADMIN_ENDPOINT}/search`,
                {
                    params: { name },
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
                throw new Error(`User with the name '${name}' not found.`);
            }
            throw new Error('Failed to search for user');
        }
    },
};
