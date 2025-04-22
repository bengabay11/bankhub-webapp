import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import {
    BalanceUpdate,
    BalanceActionType,
    Transfer,
    UserType,
    UserDetails,
} from '../models/userModels';
import Toast from '../components/shared/Toast';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardContent from '../components/dashboard/DashboardContent';
import TransactionModal from '../components/dashboard/TransactionModal';
import FilterPanel from '../components/dashboard/FilterPanel';

interface DashboardError extends Error {
    message: string;
}

const Dashboard = () => {
    const [displayName, setDisplayName] = useState('');
    const [userType, setUserType] = useState<UserType | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
    const [displayedBalance, setDisplayedBalance] = useState<number | null>(
        null
    );
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [balanceHistory, setBalanceHistory] = useState<BalanceUpdate[]>([]);
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [modal, setModal] = useState<{ type: string; isOpen: boolean }>({
        type: '',
        isOpen: false,
    });
    const [isBalanceUpdating, setIsBalanceUpdating] = useState(false);
    const [activeTab, setActiveTab] = useState<'transfer' | 'balance'>(
        'transfer'
    );
    const [transitionColor, setTransitionColor] = useState('#4b4f56');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        type: 'all',
        dateRange: 'all',
        amount: 'all',
        balanceAction: 'all',
        transferType: 'all',
        minAmount: '',
        maxAmount: '',
    });
    const filterPanelRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [toast, setToast] = useState<{
        message: string;
        type: 'info' | 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'info',
        isVisible: false,
    });

    useEffect(() => {
        const checkAuthenticationAndFetchData = async () => {
            try {
                const user = location.state?.user;
                if (!user) {
                    navigate('/');
                    return;
                }

                setDisplayName(user.displayName);
                setUserType(user.type);

                await Promise.all([
                    fetchBalance(),
                    fetchTransfers(),
                    fetchBalanceHistory(),
                    fetchUsers(),
                ]);
            } catch (err) {
                console.error('Failed to initialize dashboard:', err);
                navigate('/');
            }
        };

        const fetchBalance = async () => {
            try {
                const userBalance = await userService.getUserBalance();
                setBalance(userBalance);
                setDisplayedBalance(userBalance);
            } catch (err) {
                console.error('Failed to fetch balance', err);
                setBalance(null);
                setDisplayedBalance(null);
            }
        };

        const fetchTransfers = async () => {
            try {
                const data = await userService.getUserTransfers();
                setTransfers(data);
            } catch (err) {
                console.error('Failed to fetch transfers', err);
            }
        };

        const fetchBalanceHistory = async () => {
            try {
                const history = await userService.getBalanceHistory();
                setBalanceHistory(history);
            } catch (err) {
                console.error('Failed to fetch balance history', err);
            }
        };

        const fetchUsers = async () => {
            try {
                const allUsers = await userService.getAllUsers();
                setUsers(allUsers);
            } catch (err) {
                console.error('Failed to fetch users', err);
            }
        };

        checkAuthenticationAndFetchData();
    }, [navigate, location]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && modal.isOpen) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [modal.isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                filterPanelRef.current &&
                !filterPanelRef.current.contains(event.target as Node)
            ) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    const openModal = (type: string) => {
        setModal({ type, isOpen: true });
    };

    const closeModal = () => {
        setModal({ type: '', isOpen: false });
        setErrorMessage('');
    };

    const handleTabChange = (tab: 'transfer' | 'balance') => {
        setActiveTab(tab);
    };

    const handleSubmit = async (amount: number, targetUserId?: string) => {
        try {
            let newTransitionColor = '#4b4f56';

            if (modal.type === 'Withdraw') {
                const response: BalanceUpdate = await userService.withdraw(
                    amount
                );
                setBalanceHistory((prev) => [response, ...prev]);
                newTransitionColor = '#ef4444';
            } else if (modal.type === 'Deposit') {
                const response: BalanceUpdate = await userService.deposit(
                    amount
                );
                newTransitionColor = '#10b981';
                setBalanceHistory((prev) => [response, ...prev]);
            } else if (modal.type === 'Transfer') {
                const transfer: Transfer = await userService.transfer(
                    targetUserId || '',
                    amount
                );
                setTransfers((prev) => [transfer, ...prev]);
                newTransitionColor = '#ef4444';
            }

            setErrorMessage(null);
            closeModal();

            // Add transition effect to balance
            setIsBalanceUpdating(true);
            setTransitionColor(newTransitionColor);
            const updatedBalance = await userService.getUserBalance();
            const animationDuration = 1000;
            const steps = 20;
            const currentBalance = balance || 0;
            const stepValue = (updatedBalance - currentBalance) / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                setDisplayedBalance(currentBalance + stepValue * currentStep);
                if (currentStep === steps) {
                    clearInterval(interval);
                    setDisplayedBalance(updatedBalance);
                    setBalance(updatedBalance);
                    setIsBalanceUpdating(false);
                    setTransitionColor('#4b4f56');
                }
            }, animationDuration / steps);
        } catch (err: unknown) {
            const error = err as DashboardError;
            setErrorMessage(error.message || 'An error occurred');
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/'); // Redirect to login page after logout
        } catch (err) {
            console.error('Failed to logout:', err);
            alert('Failed to logout. Please try again.');
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilterOptions((prev) => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilterOptions({
            type: 'all',
            dateRange: 'all',
            amount: 'all',
            balanceAction: 'all',
            transferType: 'all',
            minAmount: '',
            maxAmount: '',
        });
        setSearchTerm('');
    };

    const filterHistory = (items: (Transfer | BalanceUpdate)[]) => {
        return items.filter((item) => {
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                if ('giverUser' in item) {
                    const transfer = item as Transfer;
                    if (
                        !transfer.giverUser?.displayName
                            .toLowerCase()
                            .includes(searchLower) &&
                        !transfer.takerUser?.displayName
                            .toLowerCase()
                            .includes(searchLower)
                    ) {
                        return false;
                    }
                }
            }

            const amount = item.amount;
            const minAmount = filterOptions.minAmount
                ? parseFloat(filterOptions.minAmount)
                : null;
            const maxAmount = filterOptions.maxAmount
                ? parseFloat(filterOptions.maxAmount)
                : null;

            if (minAmount !== null && maxAmount !== null) {
                if (minAmount <= maxAmount) {
                    if (amount < minAmount || amount > maxAmount) return false;
                } else return false;
            } else if (minAmount !== null) {
                if (amount < minAmount) return false;
            } else if (maxAmount !== null) {
                if (amount > maxAmount) return false;
            }

            if (filterOptions.transferType !== 'all' && 'giverUser' in item) {
                const transfer = item as Transfer;
                if (
                    filterOptions.transferType === 'sent' &&
                    transfer.giverUser?.displayName !== displayName
                ) {
                    return false;
                }
                if (
                    filterOptions.transferType === 'received' &&
                    transfer.takerUser?.displayName !== displayName
                ) {
                    return false;
                }
            }

            if (filterOptions.dateRange !== 'all') {
                const date = new Date(item.at);
                const now = new Date();
                switch (filterOptions.dateRange) {
                    case 'today':
                        if (date.toDateString() !== now.toDateString())
                            return false;
                        break;
                    case 'yesterday': {
                        const yesterday = new Date(now);
                        yesterday.setDate(yesterday.getDate() - 1);
                        if (date.toDateString() !== yesterday.toDateString())
                            return false;
                        break;
                    }
                    case 'lastWeek': {
                        const lastWeek = new Date(now);
                        lastWeek.setDate(lastWeek.getDate() - 7);
                        if (date < lastWeek) return false;
                        break;
                    }
                    case 'lastMonth': {
                        const lastMonth = new Date(now);
                        lastMonth.setMonth(lastMonth.getMonth() - 1);
                        if (date < lastMonth) return false;
                        break;
                    }
                    case 'twoWeeks': {
                        const twoWeeks = new Date(now);
                        twoWeeks.setDate(twoWeeks.getDate() - 14);
                        if (date < twoWeeks) return false;
                        break;
                    }
                    case 'threeMonths': {
                        const threeMonths = new Date(now);
                        threeMonths.setMonth(threeMonths.getMonth() - 3);
                        if (date < threeMonths) return false;
                        break;
                    }
                    case 'sixMonths': {
                        const sixMonths = new Date(now);
                        sixMonths.setMonth(sixMonths.getMonth() - 6);
                        if (date < sixMonths) return false;
                        break;
                    }
                }
            }

            if (filterOptions.balanceAction !== 'all' && 'action' in item) {
                const balanceUpdate = item as BalanceUpdate;
                if (
                    balanceUpdate.action.toString() !==
                    filterOptions.balanceAction
                ) {
                    return false;
                }
            }

            return true;
        });
    };

    const handleExport = () => {
        const filteredData = filterHistory(
            activeTab === 'transfer' ? transfers : balanceHistory
        );
        const csvContent =
            'data:text/csv;charset=utf-8,' +
            'Date,Type,Amount,Details\n' +
            filteredData
                .map((item) => {
                    const date = new Date(item.at).toLocaleString();
                    if ('giverUser' in item) {
                        const transfer = item as Transfer;
                        return `${date},Transfer,${transfer.amount},${transfer.giverUser?.displayName} → ${transfer.takerUser?.displayName}`;
                    } else {
                        const balanceUpdate = item as BalanceUpdate;
                        return `${date},${
                            BalanceActionType[balanceUpdate.action]
                        },${balanceUpdate.amount},Balance: ${
                            balanceUpdate.balanceAfter
                        }`;
                    }
                })
                .join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${activeTab}_history.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const showToast = (
        message: string,
        type: 'info' | 'success' | 'error' = 'info'
    ) => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
    };

    return (
        <div className="dashboard-page">
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() =>
                    setToast((prev) => ({ ...prev, isVisible: false }))
                }
            />

            {/* Header */}
            <DashboardHeader
                onLogout={handleLogout}
                displayName={displayName}
                userType={userType!}
            />

            {/* Main Content */}
            <DashboardContent
                displayedBalance={displayedBalance}
                isBalanceUpdating={isBalanceUpdating}
                transitionColor={transitionColor}
                onOpenModal={openModal}
                onShowToast={showToast}
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

            {/* Filter Panel */}
            {isFilterOpen && (
                <FilterPanel
                    isFilterOpen={isFilterOpen}
                    filterPanelRef={filterPanelRef}
                    filterOptions={filterOptions}
                    handleFilterChange={handleFilterChange}
                    resetFilters={resetFilters}
                    setIsFilterOpen={setIsFilterOpen}
                    activeTab={activeTab}
                />
            )}

            {/* Modal */}
            <TransactionModal
                isOpen={modal.isOpen}
                type={modal.type as 'Withdraw' | 'Deposit' | 'Transfer'}
                onClose={closeModal}
                onSubmit={handleSubmit}
                users={users}
                displayName={displayName}
                error={errorMessage}
            />
        </div>
    );
};

export default Dashboard;
