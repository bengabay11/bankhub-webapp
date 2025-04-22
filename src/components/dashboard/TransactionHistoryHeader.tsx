import React from 'react';

interface TransactionHistoryHeaderProps {
    isSearchOpen: boolean;
    isFilterOpen: boolean;
    setIsSearchOpen: (isOpen: boolean) => void;
    setIsFilterOpen: (isOpen: boolean) => void;
    handleExport: () => void;
    activeTab: 'transfer' | 'balance';
    handleTabChange: (tab: 'transfer' | 'balance') => void;
    searchTerm: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionHistoryHeader: React.FC<TransactionHistoryHeaderProps> = ({
    isSearchOpen,
    isFilterOpen,
    setIsSearchOpen,
    setIsFilterOpen,
    handleExport,
    activeTab,
    handleTabChange,
    searchTerm,
    handleSearch,
}) => {
    return (
        <>
            <div className="history-header">
                <h3 className="history-title">Transaction History</h3>
                <div className="history-actions">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="history-action-btn"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="history-action-btn"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                    </button>
                    <button
                        onClick={handleExport}
                        className="history-action-btn"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
            )}

            <div className="history-tabs">
                <button
                    onClick={() => handleTabChange('transfer')}
                    className={`history-tab ${
                        activeTab === 'transfer'
                            ? 'history-tab-active'
                            : 'history-tab-inactive'
                    }`}
                >
                    Transfers
                </button>
                <button
                    onClick={() => handleTabChange('balance')}
                    className={`history-tab ${
                        activeTab === 'balance'
                            ? 'history-tab-active'
                            : 'history-tab-inactive'
                    }`}
                >
                    Balance Updates
                </button>
            </div>
        </>
    );
};

export default TransactionHistoryHeader;
