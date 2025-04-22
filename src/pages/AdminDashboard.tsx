import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { FullUserDetails } from '../models/userModels';
import AdminHeader from '../components/admin/AdminHeader';
import UserList from '../components/admin/UserList';
import UserSearch from '../components/admin/UserSearch';
import DeleteUserModal from '../components/admin/DeleteUserModal';
import Toast from '../components/shared/Toast';
import '../styles/pages/AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<FullUserDetails[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<FullUserDetails[]>([]);
    const [selectedUser, setSelectedUser] = useState<FullUserDetails | null>(
        null
    );
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
        isVisible: boolean;
    }>({
        message: '',
        type: 'success',
        isVisible: false,
    });

    const fetchUsers = useCallback(async () => {
        try {
            const usersList = await adminService.getAllUsers();
            setUsers(usersList);
            setFilteredUsers(usersList);
        } catch (err) {
            showToast('Failed to fetch users', 'error');
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(
            (user) =>
                user.displayName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (user.email
                    ? user.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    : false)
        );
        setFilteredUsers(filtered);
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await adminService.deleteUser(userId);
            setUsers(users.filter((user) => user.id !== userId));
            setFilteredUsers(
                filteredUsers.filter((user) => user.id !== userId)
            );
            showToast('User deleted successfully', 'success');
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (err) {
            showToast('Failed to delete user', 'error');
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({
            message,
            type,
            isVisible: true,
        });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, isVisible: false }));
        }, 3000);
    };

    return (
        <div className="admin-dashboard">
            <AdminHeader />

            <main className="admin-content">
                <div className="admin-container">
                    <h1 className="admin-title">User Management</h1>

                    <UserSearch onSearch={handleSearch} />

                    <UserList
                        users={filteredUsers}
                        onDeleteUser={(user: FullUserDetails) => {
                            setSelectedUser(user);
                            setIsDeleteModalOpen(true);
                        }}
                    />
                </div>
            </main>

            {isDeleteModalOpen && selectedUser && (
                <DeleteUserModal
                    user={selectedUser}
                    onConfirm={() => handleDeleteUser(selectedUser.id)}
                    onCancel={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedUser(null);
                    }}
                />
            )}

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() =>
                    setToast((prev) => ({ ...prev, isVisible: false }))
                }
            />
        </div>
    );
};

export default AdminDashboard;
