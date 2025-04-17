import { useState } from 'react';
import { authService } from '../services/authService'; // ייבוא ה-authService

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email || !password) {
            setErrorMsg('Please fill in all fields.'); // הודעת שגיאה באנגלית
            return;
        }

        try {
            const token = await authService.login(email, password); // קריאה ל-authService
            localStorage.setItem('token', token);
            window.location.href = '/dashboard';
        } catch (err: any) {
            setErrorMsg(err.message); // הצגת הודעת שגיאה באנגלית
        }
    };

    return (
        <div
            className="login-container"
            style={{ maxWidth: 400, margin: 'auto', padding: 20 }}
        >
            <h2>Login to BankHub</h2>
            <form onSubmit={handleLogin}>
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
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}{' '}
                <button type="submit" style={{ marginTop: 20, width: '100%' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
