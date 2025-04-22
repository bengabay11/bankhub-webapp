import '../../styles/components/dashboard/DashboardHeader.css';
import '../../styles/common.css';
import { UserType } from '../../models/userModels';
import { FaSignOutAlt } from 'react-icons/fa';

const getUserTypeLabel = (userType: UserType): string => {
    switch (userType) {
        case UserType.Personal:
            return 'Personal Account';
        case UserType.RetailShop:
            return 'Retail Shop Account';
        case UserType.Supermarket:
            return 'Supermarket Account';
        case UserType.Pharmacy:
            return 'Pharmacy Account';
        case UserType.FoodBusiness:
            return 'Food Business Account';
        default:
            return 'Unknown Account Type';
    }
};

interface DashboardHeaderProps {
    onLogout: () => void;
    displayName: string;
    userType: UserType;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    onLogout,
    displayName,
    userType,
}) => {
    return (
        <header className="dashboard-header">
            <div className="header-container">
                <div className="header-content">
                    <div className="header-brand">
                        <div className="header-logo">BankHub</div>
                        <div className="header-divider" />
                        <div className="header-subtitle">Online Banking</div>
                    </div>
                    <div className="header-user-info">
                        <div className="header-welcome">
                            Welcome,{' '}
                            <span className="user-name">{displayName}</span>
                        </div>
                        <div className="header-account-type">
                            {getUserTypeLabel(userType)}
                        </div>
                    </div>
                    <button onClick={onLogout} className="admin-header-logout">
                        <FaSignOutAlt className="admin-header-logout-icon" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
