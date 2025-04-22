export interface GetUserBalanceResponse {
    balance: number;
}

export enum BalanceActionType {
    Withdrawal = 1,
    Deposit = 2,
}

export interface BalanceUpdate {
    id: string;
    action: BalanceActionType;
    amount: number;
    at: string;
    balanceAfter: number;
}

export interface Transfer {
    id: string;
    giverUser: UserDetails;
    takerUser: UserDetails;
    amount: number;
    at: string;
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

export enum Permission {
    ViewDashboard = 1,
    ViewAdminDashboard = 2,
}

export enum UserType {
    Personal = 1,
    RetailShop = 2,
    Supermarket = 3,
    Pharmacy = 4,
    FoodBusiness = 5,
}

export interface UserDetails {
    id: string;
    displayName: string;
    type: UserType;
}

export interface ExtendedUserDetails {
    id: string;
    displayName: string;
    type: UserType;
    email: string | null;
    userName: string | null;
    balance: number;
    permissions: Permission[];
    createdAt: string;
}

export interface FullUserDetails {
    id: string;
    displayName: string;
    type: UserType;
    email: string | null;
    userName: string | null;
    balance: number;
    incomingTransfers: Transfer[];
    outgoingTransfers: Transfer[];
}
