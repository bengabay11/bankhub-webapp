import { useState } from 'react';
import { authService } from '../services/authService';
import { RegisterDto } from '../models/authModels';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!email || !password || !confirmPassword) {
            setErrorMsg('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }

        try {
            const data: RegisterDto = {
                email: email,
                password: password,
                userType: 0,
                displayName: 'test',
            };
            await authService.register(data);
            setSuccessMsg('Successfully registered user');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setErrorMsg(err.message || 'An error occurred during registration');
        }
    };

    return (
        <div
            className="register-container"
            style={{ maxWidth: 400, margin: 'auto', padding: 20 }}
        >
            <h2>Register for BankHub</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>

                {/* מציגים את הודעת השגיאה אם קיימת */}
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                {/* מציגים הודעה על הצלחה */}
                {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

                <button type="submit" style={{ marginTop: 20, width: '100%' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
