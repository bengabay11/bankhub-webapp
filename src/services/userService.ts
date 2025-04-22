import {
    BalanceUpdate,
    Transfer,
    CreateTransferBody,
    WithdrawBody,
    DepositBody,
    ExtendedUserDetails,
    UserDetails,
} from '../models/userModels';
import api from './serverApi';
import { GetUserBalanceResponse } from '../models/userModels';

const USER_API_PREFIX = '/api';

export const userService = {
    async getUserBalance(): Promise<number> {
        const res = await api.get<GetUserBalanceResponse>(
            `${USER_API_PREFIX}/Balance`
        );
        return res.data.balance;
    },

    async withdraw(amount: number): Promise<BalanceUpdate> {
        try {
            const res = await api.put<BalanceUpdate>(
                `${USER_API_PREFIX}/Balance/Withdraw`,
                {
                    amount,
                } satisfies WithdrawBody
            );
            return res.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Withdraw failed');
        }
    },

    async deposit(amount: number): Promise<BalanceUpdate> {
        try {
            const res = await api.put<BalanceUpdate>(
                `${USER_API_PREFIX}/Balance/Deposit`,
                {
                    amount,
                } satisfies DepositBody
            );
            return res.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Deposit failed');
        }
    },

    async transfer(takerUserId: string, amount: number): Promise<Transfer> {
        try {
            const res = await api.post<Transfer>(
                `${USER_API_PREFIX}/Transfers`,
                {
                    takerUserId,
                    amount,
                } satisfies CreateTransferBody
            );
            return res.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Transfer failed');
        }
    },

    async getUserTransfers(): Promise<Transfer[]> {
        const res = await api.get<Transfer[]>(`${USER_API_PREFIX}/Transfers`);
        return res.data.map((transfer: Transfer) => ({
            ...transfer,
            type: 'Transfer',
        }));
    },

    async getUserTransfer(transferId: string): Promise<Transfer> {
        try {
            const res = await api.get<Transfer>(
                `${USER_API_PREFIX}/Transfers/${transferId}`
            );
            return res.data;
        } catch (err: any) {
            throw new Error(
                err.response?.data?.message || 'Transfer not found'
            );
        }
    },

    async getBalanceHistory(): Promise<BalanceUpdate[]> {
        try {
            const res = await api.get<BalanceUpdate[]>(
                `${USER_API_PREFIX}/Balance/History`
            );
            return res.data.map((update: BalanceUpdate) => ({
                ...update,
            }));
        } catch (err: any) {
            throw new Error(
                err.response?.data?.message || 'Failed to fetch balance history'
            );
        }
    },

    async getCurrentUserInfo(): Promise<ExtendedUserDetails> {
        try {
            const res = await api.get<ExtendedUserDetails>(
                `${USER_API_PREFIX}/Users/current`
            );
            return res.data;
        } catch (err: any) {
            throw new Error(
                err.response?.data?.message ||
                    'Failed to fetch current user info'
            );
        }
    },

    async getAllUsers(): Promise<UserDetails[]> {
        const res = await api.get<UserDetails[]>(`${USER_API_PREFIX}/Users`);
        return res.data;
    },
};
