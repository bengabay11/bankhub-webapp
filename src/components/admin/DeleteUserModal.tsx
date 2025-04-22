import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { ExtendedUserDetails } from '../../models/userModels';
import '../../styles/components/admin/DeleteUserModal.css';

interface DeleteUserModalProps {
    user: ExtendedUserDetails;
    onConfirm: () => Promise<void>;
    onCancel: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
    user,
    onConfirm,
    onCancel,
}) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="delete-user-modal-overlay">
            <div className="delete-user-modal">
                <h2 className="delete-user-modal-title">
                    <FaExclamationTriangle className="delete-user-modal-icon" />
                    Delete User
                </h2>
                <p className="delete-user-modal-message">
                    Are you sure you want to delete the user{' '}
                    <strong>{user.displayName}</strong>{' '}
                    {user.email && `(${user.email})`}?
                </p>
                <p className="delete-user-modal-warning">
                    This action cannot be undone.
                </p>
                <div className="delete-user-modal-actions">
                    <button
                        className="delete-user-modal-cancel"
                        onClick={onCancel}
                        disabled={isDeleting}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="delete-user-modal-confirm"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        type="button"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
