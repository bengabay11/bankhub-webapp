import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface InputProps {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    icon?: IconType;
    required?: boolean;
    isPassword?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

const Input: React.FC<InputProps> = ({
    id,
    type,
    placeholder,
    value,
    onChange,
    label,
    icon: Icon,
    required = false,
    isPassword = false,
    showPassword = false,
    onTogglePassword,
}) => {
    return (
        <div className="input-container">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <div className="input-wrapper">
                {Icon && (
                    <div className="input-icon">
                        <Icon size={16} />
                    </div>
                )}
                <input
                    id={id}
                    type={
                        isPassword ? (showPassword ? 'text' : 'password') : type
                    }
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="input-field"
                />
                {isPassword && onTogglePassword && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="input-toggle"
                    >
                        {showPassword ? (
                            <FaEye size={16} />
                        ) : (
                            <FaEyeSlash size={16} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
