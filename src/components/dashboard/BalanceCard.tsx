import React from 'react';
import { FaArrowRight, FaMoneyBillWave, FaWallet } from 'react-icons/fa';

interface BalanceCardProps {
    displayedBalance: number | null;
    isBalanceUpdating: boolean;
    transitionColor: string;
    onOpenModal: (type: string) => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
    displayedBalance,
    isBalanceUpdating,
    transitionColor,
    onOpenModal,
}) => {
    return (
        <div className="balance-card">
            <div className="balance-display">
                <div className="balance-label">Available Balance</div>
                <p
                    className={`balance-amount ${
                        isBalanceUpdating
                            ? 'balance-amount-updating'
                            : 'balance-amount-normal'
                    }`}
                    style={{
                        color: isBalanceUpdating ? transitionColor : undefined,
                    }}
                >
                    {displayedBalance !== null && displayedBalance !== undefined
                        ? `$${displayedBalance < 0 ? '-' : ''}${Math.abs(
                              displayedBalance
                          ).toFixed(2)}`
                        : '$0.00'}
                </p>
            </div>
            {/* Quick Action Buttons */}
            <div className="quick-actions">
                <button
                    className="quick-action-btn"
                    onClick={() => onOpenModal('Transfer')}
                >
                    <FaArrowRight size={16} className="quick-action-icon" />
                    <span className="quick-action-text">Transfer</span>
                </button>
                <button
                    className="quick-action-btn"
                    onClick={() => onOpenModal('Deposit')}
                >
                    <FaMoneyBillWave size={16} className="quick-action-icon" />
                    <span className="quick-action-text">Deposit</span>
                </button>
                <button
                    className="quick-action-btn"
                    onClick={() => onOpenModal('Withdraw')}
                >
                    <FaWallet size={16} className="quick-action-icon" />
                    <span className="quick-action-text">Withdraw</span>
                </button>
            </div>
        </div>
    );
};

export default BalanceCard;
