import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaLock,
    FaEnvelope,
    FaUser,
    FaArrowRight,
    FaStore,
} from 'react-icons/fa';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { RegisterDto } from '../../models/authModels';
import Input from '../shared/Input';
import Select from '../shared/Select';
import Button from '../shared/Button';
import ErrorMessage from '../shared/ErrorMessage';
import { UserType } from '../../models/userModels';
import '../../styles/components/auth/RegisterForm.css';

const userTypeOptions = [
    { value: UserType.Personal, label: 'Personal Account' },
    { value: UserType.RetailShop, label: 'Retail Shop' },
    { value: UserType.Supermarket, label: 'Supermarket' },
    { value: UserType.Pharmacy, label: 'Pharmacy' },
    { value: UserType.FoodBusiness, label: 'Food Business' },
];

const RegisterForm: React.FC = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState<number>(0);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessages([]);

        if (
            !displayName ||
            !email ||
            !password ||
            !confirmPassword ||
            !userType
        ) {
            setErrorMessages(['Please fill in all fields.']);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessages(['Passwords do not match.']);
            return;
        }

        try {
            const data: RegisterDto = {
                email: email,
                password: password,
                userType: userType,
                displayName: displayName,
            };

            await authService.register(data);
            await authService.login({ email, password });

            const currentUser = await userService.getCurrentUserInfo();
            navigate('/dashboard', { state: { user: currentUser } });
        } catch (err: unknown) {
            const error = err as {
                response?: {
                    status?: number;
                    data?: {
                        errors?: Array<{ description: string }>;
                    };
                };
                message?: string;
            };

            if (
                error.response?.status === 400 &&
                error.response?.data?.errors
            ) {
                const errors = error.response.data.errors.map(
                    (error: { description: string }) => error.description
                );
                setErrorMessages(errors);
            } else {
                setErrorMessages([
                    error.message || 'An error occurred during registration',
                ]);
            }
        }
    };

    const handleLoginRedirect = () => {
        navigate('/');
    };

    return (
        <div className="form-container">
            {errorMessages.length > 0 && (
                <ErrorMessage messages={errorMessages} />
            )}

            <form onSubmit={handleRegister}>
                <div className="form-row">
                    <Input
                        id="displayName"
                        type="text"
                        placeholder="Enter your name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        label="Display Name"
                        icon={FaUser}
                        required
                    />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        icon={FaEnvelope}
                        required
                    />
                </div>

                <Select
                    id="userType"
                    value={userType}
                    onChange={(e) => setUserType(Number(e.target.value))}
                    label="Account Type"
                    icon={FaStore}
                    options={userTypeOptions}
                    required
                />

                <div className="form-row">
                    <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        icon={FaLock}
                        required
                        isPassword
                        showPassword={showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirm Password"
                        icon={FaLock}
                        required
                        isPassword
                        showPassword={showConfirmPassword}
                        onTogglePassword={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    />
                </div>

                <Button type="submit" icon={FaArrowRight}>
                    Get Started
                </Button>

                <div className="register-link-container">
                    <span>Already have an account? </span>
                    <span
                        onClick={handleLoginRedirect}
                        className="register-link"
                    >
                        Sign in now
                    </span>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
