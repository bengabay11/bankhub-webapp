import React from 'react';
import { IconType } from 'react-icons';
import '../../styles/components/shared/Select.css';

interface SelectProps {
    id: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label: string;
    icon?: IconType;
    options: { value: string | number; label: string }[];
    required?: boolean;
}

const Select: React.FC<SelectProps> = ({
    id,
    value,
    onChange,
    label,
    icon: Icon,
    options,
    required = false,
}) => {
    return (
        <div className="input-container">
            <label htmlFor={id} className="input-label">
                {label}
            </label>
            <div className="input-wrapper">
                {Icon && <Icon className="input-icon" />}
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="input-field"
                    required={required}
                >
                    <option value="">Select {label}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Select;
