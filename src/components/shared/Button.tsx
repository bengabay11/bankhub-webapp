import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'cancel';
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    icon?: IconType;
    iconPosition?: 'left' | 'right';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    type = 'button',
    variant = 'primary',
    onClick,
    disabled = false,
    children,
    icon: Icon,
    iconPosition = 'right',
    className = '',
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const combinedClassName =
        `${baseClass} ${variantClass} ${className}`.trim();

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
        >
            {Icon && iconPosition === 'left' && (
                <Icon className="button-icon" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
                <Icon className="button-icon" />
            )}
        </button>
    );
};

export default Button;
