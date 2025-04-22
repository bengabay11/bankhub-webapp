import React from 'react';
import { Transfer, BalanceUpdate } from '../../models/userModels';
import TransactionHistoryHeader from './TransactionHistoryHeader';
import TransactionListItem from './TransactionListItem';

interface TransactionHistoryProps {
    isSearchOpen: boolean;
    isFilterOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
    setIsFilterOpen: (isOpen: boolean) => void;
    handleExport: () => void;
    activeTab: 'transfer' | 'balance';
    handleTabChange: (tab: 'transfer' | 'balance') => void;
    searchTerm: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    transfers: Transfer[];
    balanceHistory: BalanceUpdate[];
    displayName: string;
    filterHistory: (
        items: (Transfer | BalanceUpdate)[]
    ) => (Transfer | BalanceUpdate)[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({
    isSearchOpen,
    isFilterOpen,
    setIsSearchOpen,
    setIsFilterOpen,
    handleExport,
    activeTab,
    handleTabChange,
    searchTerm,
    handleSearch,
    transfers,
    balanceHistory,
    displayName,
    filterHistory,
}) => {
    return (
        <div className="history-section">
            <TransactionHistoryHeader
                isSearchOpen={isSearchOpen}
                isFilterOpen={isFilterOpen}
                setIsSearchOpen={setIsSearchOpen}
                setIsFilterOpen={setIsFilterOpen}
                handleExport={handleExport}
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
            />

            <div className="transaction-list">
                {activeTab === 'transfer' ? (
                    transfers.length > 0 ? (
                        <ul className="transaction-list-container">
                            {filterHistory(transfers).map((item) => (
                                <TransactionListItem
                                    key={item.at}
                                    item={item}
                                    displayName={displayName}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="transaction-list-empty">
                            No transfers found.
                        </div>
                    )
                ) : balanceHistory.length > 0 ? (
                    <ul className="transaction-list-container">
                        {filterHistory(balanceHistory).map((item) => (
                            <TransactionListItem
                                key={item.at}
                                item={item}
                                displayName={displayName}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="transaction-list-empty">
                        No balance history found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionHistory;
