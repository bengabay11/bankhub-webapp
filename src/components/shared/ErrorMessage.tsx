import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

interface ErrorMessageProps {
    messages: string | string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ messages }) => {
    const messageArray = Array.isArray(messages) ? messages : [messages];

    if (messageArray.length === 0) return null;

    return (
        <div className="error-message">
            <FaExclamationCircle className="error-icon" />
            <div>
                {messageArray.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
};

export default ErrorMessage;
