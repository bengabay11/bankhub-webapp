import React from 'react';
import { FaTrash, FaUser } from 'react-icons/fa';
import { ExtendedUserDetails, UserType } from '../../models/userModels';
import '../../styles/components/admin/UserList.css';

interface UserListProps {
    users: ExtendedUserDetails[];
    onDeleteUser: (user: ExtendedUserDetails) => void;
}

const getUserTypeBadgeClass = (userType: UserType): string => {
    switch (userType) {
        case UserType.Personal:
            return 'user-type-personal';
        case UserType.RetailShop:
            return 'user-type-retailshop';
        case UserType.Supermarket:
            return 'user-type-supermarket';
        case UserType.Pharmacy:
            return 'user-type-pharmacy';
        case UserType.FoodBusiness:
            return 'user-type-foodbusiness';
        default:
            return 'user-type-personal';
    }
};

const getUserTypeLabel = (userType: UserType): string => {
    switch (userType) {
        case UserType.Personal:
            return 'Personal';
        case UserType.RetailShop:
            return 'Retail Shop';
        case UserType.Supermarket:
            return 'Supermarket';
        case UserType.Pharmacy:
            return 'Pharmacy';
        case UserType.FoodBusiness:
            return 'Food Business';
        default:
            return 'Personal';
    }
};

const UserList: React.FC<UserListProps> = ({ users, onDeleteUser }) => {
    return (
        <div className="user-list">
            {users.length > 0 ? (
                <div className="user-list-table-container">
                    <table className="user-list-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Account Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar">
                                                <FaUser />
                                            </div>
                                            <span className="user-name">
                                                {user.displayName}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`user-type-badge ${getUserTypeBadgeClass(
                                                user.type
                                            )}`}
                                        >
                                            {getUserTypeLabel(user.type)}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="user-delete-button"
                                            onClick={() => onDeleteUser(user)}
                                            title="Delete User"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="user-list-empty">
                    <FaUser size={48} opacity={0.5} />
                    <p>No users found</p>
                </div>
            )}
        </div>
    );
};

export default UserList;
