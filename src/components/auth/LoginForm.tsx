import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { AuthError, authService } from '../../services/authService';
import { userService } from '../../services/userService';
import { LoginDto } from '../../models/authModels';
import { Permission } from '../../models/userModels';
import Input from '../shared/Input';
import Button from '../shared/Button';
import ErrorMessage from '../shared/ErrorMessage';
import '../../styles/components/auth/LoginForm.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email || !password) {
            setErrorMsg('Please fill in all fields.');
            return;
        }

        try {
            const data: LoginDto = {
                email: email,
                password: password,
            };
            await authService.login(data);

            const currentUser = await userService.getCurrentUserInfo();
            if (
                currentUser.permissions.includes(Permission.ViewAdminDashboard)
            ) {
                navigate('/admin-dashboard', { state: { user: currentUser } });
            } else {
                navigate('/dashboard', { state: { user: currentUser } });
            }
        } catch (error: unknown) {
            if (error instanceof AuthError) {
                setErrorMsg(error.message);
            } else {
                setErrorMsg('An unexpected error occurred');
            }
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-form-container">
            <h2 className="login-form-title">Sign In to Your Account</h2>

            {errorMsg && <ErrorMessage messages={errorMsg} />}

            <form onSubmit={handleLogin}>
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

                <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    icon={FaLock}
                    required
                    isPassword
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <Button type="submit" icon={FaArrowRight}>
                    Sign In
                </Button>

                <div className="login-link-container">
                    <span>Don't have an account? </span>
                    <span
                        onClick={handleRegisterRedirect}
                        className="login-link"
                    >
                        Create one now
                    </span>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
