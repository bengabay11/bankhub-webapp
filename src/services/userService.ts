// userService.ts
import axios from 'axios';
import {
    BalanceUpdate,
    Transfer,
    CreateTransferBody,
    WithdrawBody,
    DepositBody,
} from '../models/userModels';

const API_BASE = '/api';

export const userService = {
    async getUserBalance(): Promise<number> {
        const res = await axios.get(`${API_BASE}/Balance`);
        return res.data.balance;
    },

    async withdraw(amount: number): Promise<void> {
        try {
            await axios.put(`${API_BASE}/Balance/Withdraw`, {
                amount,
            } satisfies WithdrawBody);
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Withdraw failed');
        }
    },

    async deposit(amount: number): Promise<void> {
        try {
            await axios.put(`${API_BASE}/Balance/Deposit`, {
                amount,
            } satisfies DepositBody);
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Deposit failed');
        }
    },

    async transfer(takerUserId: string, amount: number): Promise<void> {
        try {
            await axios.post(`${API_BASE}/Transfers`, {
                takerUserId,
                amount,
            } satisfies CreateTransferBody);
        } catch (err: any) {
            throw new Error(err.response?.data?.message || 'Transfer failed');
        }
    },

    async getUserTransfers(): Promise<Transfer[]> {
        const res = await axios.get(`${API_BASE}/Transfers`);
        return res.data;
    },

    async getUserTransfer(transferId: string): Promise<Transfer> {
        try {
            const res = await axios.get(`${API_BASE}/Transfers/${transferId}`);
            return res.data;
        } catch (err: any) {
            throw new Error(
                err.response?.data?.message || 'Transfer not found'
            );
        }
    },

    async getBalanceUpdates(): Promise<BalanceUpdate[]> {
        // Placeholder, backend doesn’t expose this yet
        return [];
    },
};
