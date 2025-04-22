import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import {
    Transfer,
    BalanceUpdate,
    BalanceActionType,
} from '../../models/userModels';

interface TransactionListItemProps {
    item: Transfer | BalanceUpdate;
    displayName: string;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
    item,
    displayName,
}) => {
    const isTransfer = 'giverUser' in item;
    const transfer = item as Transfer;
    const balanceUpdate = item as BalanceUpdate;

    if (isTransfer) {
        return (
            <li className="transaction-item">
                <div className="transaction-header">
                    <span className="transaction-type">Transfer</span>
                    <span
                        className={`transaction-amount ${
                            transfer.giverUser?.displayName === displayName
                                ? 'transaction-amount-negative'
                                : 'transaction-amount-positive'
                        }`}
                    >
                        {transfer.giverUser?.displayName === displayName
                            ? '−'
                            : '+'}
                        ${transfer.amount.toFixed(2)}
                    </span>
                </div>
                <div className="transaction-details">
                    <span className="transaction-user">
                        {transfer.giverUser?.displayName || 'N/A'}
                    </span>
                    <FaArrowRight size={14} className="transaction-arrow" />
                    <span className="transaction-user">
                        {transfer.takerUser?.displayName || 'N/A'}
                    </span>
                </div>
                <div className="transaction-date">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {new Date(transfer.at).toLocaleString()}
                </div>
            </li>
        );
    }

    return (
        <li className="transaction-item">
            <div className="transaction-header">
                <span className="transaction-type">
                    {BalanceActionType[balanceUpdate.action]}
                </span>
                <span
                    className={`transaction-amount ${
                        balanceUpdate.action === BalanceActionType.Withdrawal
                            ? 'transaction-amount-negative'
                            : 'transaction-amount-positive'
                    }`}
                >
                    {balanceUpdate.action === BalanceActionType.Withdrawal
                        ? '−'
                        : '+'}
                    ${balanceUpdate.amount.toFixed(2)}
                </span>
            </div>
            <div className="transaction-details">
                Balance After: ${balanceUpdate.balanceAfter.toFixed(2)}
            </div>
            <div className="transaction-date">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                {new Date(balanceUpdate.at).toLocaleString()}
            </div>
        </li>
    );
};

export default TransactionListItem;
