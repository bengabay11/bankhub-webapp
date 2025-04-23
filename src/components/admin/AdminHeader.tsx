import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { authService } from '../../services/authService';
import '../../styles/components/admin/AdminHeader.css';

const AdminHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/');
        } catch (err) {
            console.error('Failed to logout:', err);
        }
    };

    return (
        <header className="admin-header">
            <div className="admin-header-container">
                <div className="admin-header-content">
                    <div className="admin-header-brand">
                        <div className="admin-header-logo">BankHub</div>
                        <div className="admin-header-divider" />
                        <div className="admin-header-subtitle">Admin Panel</div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="admin-header-logout"
                    >
                        <FaSignOutAlt className="admin-header-logout-icon" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
