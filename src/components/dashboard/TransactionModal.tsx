import React, { useState } from 'react';
import { FaWallet, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';
import '../../styles/components/dashboard/TransactionModal.css';
import { UserDetails } from '../../models/userModels';

interface TransactionModalProps {
    isOpen: boolean;
    type: 'Withdraw' | 'Deposit' | 'Transfer';
    onClose: () => void;
    onSubmit: (amount: number, targetUserId?: string) => Promise<void>;
    users?: UserDetails[];
    displayName?: string;
    error: string | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
    isOpen,
    type,
    onClose,
    onSubmit,
    users = [],
    displayName = '',
    error,
}) => {
    const [amount, setAmount] = useState('');
    const [targetUserId, setTargetUserId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || (type === 'Transfer' && !targetUserId)) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(
                parseFloat(amount),
                type === 'Transfer' ? targetUserId : undefined
            );
            setAmount('');
            setTargetUserId('');
        } catch (err) {
            console.error('Transaction failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setAmount('');
        onClose();
    };

    const getIcon = () => {
        switch (type) {
            case 'Withdraw':
                return (
                    <FaWallet
                        size={24}
                        className="modal-icon modal-icon-withdraw"
                    />
                );
            case 'Deposit':
                return (
                    <FaMoneyBillWave
                        size={24}
                        className="modal-icon modal-icon-deposit"
                    />
                );
            case 'Transfer':
                return (
                    <FaArrowRight
                        size={24}
                        className="modal-icon modal-icon-transfer"
                    />
                );
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    {getIcon()}
                    <h2 className="modal-title">{type}</h2>
                </div>

                {error && (
                    <div className="modal-error">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {type === 'Transfer' && (
                        <div className="modal-form-group">
                            <label className="modal-label">
                                Select Target User
                            </label>
                            <select
                                value={targetUserId}
                                onChange={(e) =>
                                    setTargetUserId(e.target.value)
                                }
                                required
                                className="modal-select"
                            >
                                <option value="" disabled>
                                    Select a user
                                </option>
                                {users
                                    .filter(
                                        (user) =>
                                            user.displayName !== displayName
                                    )
                                    .map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.displayName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}

                    <div className="modal-form-group">
                        <label className="modal-label">Amount</label>
                        <div className="modal-amount-container">
                            <span className="modal-amount-symbol">$</span>
                            <input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                min="0"
                                step="0.01"
                                className="modal-amount-input"
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="modal-button modal-button-cancel"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                !amount ||
                                (type === 'Transfer' && !targetUserId)
                            }
                            className="modal-button modal-button-confirm"
                        >
                            Confirm
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;
