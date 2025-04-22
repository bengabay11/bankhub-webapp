import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { FaChartLine, FaShieldAlt } from 'react-icons/fa';
import '../styles/pages/Register.css';

const Register: React.FC = () => {
    return (
        <div className="register-page">
            <div className="register-container">
                <h1 className="register-title">Create Your Account</h1>
                <div className="register-features">
                    <div className="feature">
                        <FaChartLine className="feature-icon" size={24} />
                        <h3>Track Your Finances</h3>
                        <p>Monitor your spending and income in real-time</p>
                    </div>
                    <div className="feature">
                        <FaShieldAlt className="feature-icon" size={24} />
                        <h3>Secure Banking</h3>
                        <p>
                            Your financial data is protected with bank-level
                            security
                        </p>
                    </div>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;
