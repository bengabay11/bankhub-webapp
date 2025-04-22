import React, { useEffect } from 'react';
import {
    FaInfoCircle,
    FaCheckCircle,
    FaExclamationCircle,
    FaTimes,
} from 'react-icons/fa';
import '../../styles/components/shared/Toast.css';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="toast-icon" />;
            case 'error':
                return <FaExclamationCircle className="toast-icon" />;
            case 'info':
                return <FaInfoCircle className="toast-icon" />;
        }
    };

    return (
        <div className="toast-container">
            <div className={`toast toast-${type}`}>
                {getIcon()}
                <div className="toast-content">{message}</div>
                <button
                    className="toast-close"
                    onClick={onClose}
                    aria-label="Close notification"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default Toast;
