import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import '../styles/pages/Login.css';
import Copyright from '../components/shared/Copyright';

const Login: React.FC = () => {
    return (
        <div className="login-page">
            {/* Left Section: Branding and Background */}
            <div className="login-left">
                {/* Decorative Elements */}
                <div className="login-left-circle login-left-circle-top" />
                <div className="login-left-circle login-left-circle-bottom" />

                {/* Content */}
                <div className="login-left-content">
                    <h1 className="login-page-title">BankHub</h1>
                    <p className="login-description">
                        Your trusted partner in financial management. Secure,
                        fast, and easy to use.
                    </p>
                    <div className="login-stats">
                        <div className="login-stat">
                            <div className="login-stat-value">10M+</div>
                            <div className="login-stat-label">Active Users</div>
                        </div>
                        <div className="login-stat">
                            <div className="login-stat-value">$50B+</div>
                            <div className="login-stat-label">Transactions</div>
                        </div>
                        <div className="login-stat">
                            <div className="login-stat-value">99.9%</div>
                            <div className="login-stat-label">Uptime</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Login Form */}
            <div className="login-right">
                <LoginForm />
                <Copyright />
            </div>
        </div>
    );
};

export default Login;
