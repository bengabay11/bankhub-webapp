import React from 'react';
import BalanceCard from './BalanceCard';
import QuickActionsCard from './QuickActionsCard';
import TransactionHistory from './TransactionHistory';
import '../../styles/components/dashboard/DashboardContent.css';
import { Transfer, BalanceUpdate } from '../../models/userModels';

interface DashboardContentProps {
    displayedBalance: number | null;
    isBalanceUpdating: boolean;
    transitionColor: string;
    onOpenModal: (type: string) => void;
    onShowToast: (message: string, type: 'info' | 'success' | 'error') => void;
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

const DashboardContent: React.FC<DashboardContentProps> = ({
    displayedBalance,
    isBalanceUpdating,
    transitionColor,
    onOpenModal,
    onShowToast,
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
        <div className="dashboard-main">
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-left">
                    {/* Balance Section */}
                    <BalanceCard
                        displayedBalance={displayedBalance}
                        isBalanceUpdating={isBalanceUpdating}
                        transitionColor={transitionColor}
                        onOpenModal={onOpenModal}
                    />

                    {/* Quick Actions Section */}
                    <QuickActionsCard onShowToast={onShowToast} />
                </div>

                {/* Right Column - History */}
                <TransactionHistory
                    isSearchOpen={isSearchOpen}
                    isFilterOpen={isFilterOpen}
                    setIsSearchOpen={setIsSearchOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    handleExport={handleExport}
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    transfers={transfers}
                    balanceHistory={balanceHistory}
                    displayName={displayName}
                    filterHistory={filterHistory}
                />
            </div>
        </div>
    );
};

export default DashboardContent;
