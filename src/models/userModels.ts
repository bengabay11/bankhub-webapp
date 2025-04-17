// src/types/userTypes.ts

export interface BalanceUpdate {
    date: string;
    amount: number;
    type: 'deposit' | 'withdraw' | 'transfer';
}

export interface Transfer {
    id: string;
    senderUserId: string;
    takerUserId: string;
    amount: number;
    createdAt: string;
}

export interface CreateTransferBody {
    takerUserId: string;
    amount: number;
}

export interface WithdrawBody {
    amount: number;
}

export interface DepositBody {
    amount: number;
}
