import React from 'react';
import '../../styles/components/dashboard/FilterPanel.css';

interface FilterOptions {
    type: string;
    dateRange: string;
    amount: string;
    balanceAction: string;
    transferType: string;
    minAmount: string;
    maxAmount: string;
}

interface FilterPanelProps {
    isFilterOpen: boolean;
    filterPanelRef: React.RefObject<HTMLDivElement | null>;
    filterOptions: FilterOptions;
    handleFilterChange: (key: string, value: string) => void;
    resetFilters: () => void;
    setIsFilterOpen: (isOpen: boolean) => void;
    activeTab: 'transfer' | 'balance';
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    isFilterOpen,
    filterPanelRef,
    filterOptions,
    handleFilterChange,
    resetFilters,
    setIsFilterOpen,
    activeTab,
}) => {
    if (!isFilterOpen) return null;

    return (
        <div className="filter-panel" ref={filterPanelRef}>
            <div className="filter-header">
                <h3 className="filter-title">Filter Transactions</h3>
                <button
                    onClick={() => setIsFilterOpen(false)}
                    className="filter-close"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="filter-content">
                <div className="filter-group">
                    <label className="filter-label">Date Range</label>
                    <select
                        value={filterOptions.dateRange}
                        onChange={(e) =>
                            handleFilterChange('dateRange', e.target.value)
                        }
                        className="filter-select"
                    >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="lastWeek">Last 7 Days</option>
                        <option value="twoWeeks">Last 14 Days</option>
                        <option value="lastMonth">Last 30 Days</option>
                        <option value="threeMonths">Last 3 Months</option>
                        <option value="sixMonths">Last 6 Months</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Amount Range</label>
                    <div className="filter-amount-range">
                        <div className="filter-amount-input-container">
                            <span className="filter-amount-symbol">$</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={filterOptions.minAmount}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'minAmount',
                                        e.target.value
                                    )
                                }
                                className="filter-amount-input"
                            />
                        </div>
                        <span className="filter-separator">to</span>
                        <div className="filter-amount-input-container">
                            <span className="filter-amount-symbol">$</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filterOptions.maxAmount}
                                onChange={(e) =>
                                    handleFilterChange(
                                        'maxAmount',
                                        e.target.value
                                    )
                                }
                                className="filter-amount-input"
                            />
                        </div>
                    </div>
                </div>

                {activeTab === 'transfer' ? (
                    <div className="filter-group">
                        <label className="filter-label">Transfer Type</label>
                        <select
                            value={filterOptions.transferType}
                            onChange={(e) =>
                                handleFilterChange(
                                    'transferType',
                                    e.target.value
                                )
                            }
                            className="filter-select"
                        >
                            <option value="all">All Transfers</option>
                            <option value="sent">Money Sent</option>
                            <option value="received">Money Received</option>
                        </select>
                    </div>
                ) : (
                    <div className="filter-group">
                        <label className="filter-label">Balance Action</label>
                        <select
                            value={filterOptions.balanceAction}
                            onChange={(e) =>
                                handleFilterChange(
                                    'balanceAction',
                                    e.target.value
                                )
                            }
                            className="filter-select"
                        >
                            <option value="all">All Actions</option>
                            <option value="2">Deposit</option>
                            <option value="1">Withdrawal</option>
                        </select>
                    </div>
                )}

                <div className="active-filters">
                    <div className="active-filters-title">Active Filters</div>
                    <div className="active-filters-list">
                        {Object.entries(filterOptions).map(([key, value]) => {
                            if (value === 'all' || value === '') return null;

                            let label = '';
                            switch (key) {
                                case 'dateRange':
                                    switch (value) {
                                        case 'today':
                                            label = 'Today';
                                            break;
                                        case 'yesterday':
                                            label = 'Yesterday';
                                            break;
                                        case 'lastWeek':
                                            label = 'Last 7 Days';
                                            break;
                                        case 'twoWeeks':
                                            label = 'Last 14 Days';
                                            break;
                                        case 'lastMonth':
                                            label = 'Last 30 Days';
                                            break;
                                        case 'threeMonths':
                                            label = 'Last 3 Months';
                                            break;
                                        case 'sixMonths':
                                            label = 'Last 6 Months';
                                            break;
                                        default:
                                            label = value;
                                    }
                                    break;
                                case 'transferType':
                                    switch (value) {
                                        case 'sent':
                                            label = 'Sent Transfers';
                                            break;
                                        case 'received':
                                            label = 'Received Transfers';
                                            break;
                                        default:
                                            label = value;
                                    }
                                    break;
                                case 'balanceAction':
                                    switch (value) {
                                        case '1':
                                            label = 'Withdrawals';
                                            break;
                                        case '2':
                                            label = 'Deposits';
                                            break;
                                        default:
                                            label = value;
                                    }
                                    break;
                                case 'minAmount':
                                    label = `Min: $${value}`;
                                    break;
                                case 'maxAmount':
                                    label = `Max: $${value}`;
                                    break;
                                default:
                                    label = value;
                            }

                            return (
                                <div key={key} className="active-filter">
                                    <span>{label}</span>
                                    <button
                                        onClick={() =>
                                            handleFilterChange(
                                                key,
                                                key === 'minAmount' ||
                                                    key === 'maxAmount'
                                                    ? ''
                                                    : 'all'
                                            )
                                        }
                                        className="active-filter-remove"
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            ></line>
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            ></line>
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button onClick={resetFilters} className="filter-reset">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                    </svg>
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
