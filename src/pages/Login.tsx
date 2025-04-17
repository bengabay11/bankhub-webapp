import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email || !password) {
            setErrorMsg('נא למלא את כל השדות.');
            return;
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'שגיאה בהתחברות');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token); // שמור טוקן לדוגמה
            window.location.href = '/dashboard'; // ניתוב אחרי התחברות
        } catch (err: any) {
            setErrorMsg(err.message);
        }
    };

    return (
        <div
            className="login-container"
            style={{ maxWidth: 400, margin: 'auto', padding: 20 }}
        >
            <h2>התחברות ל-BankHub</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>אימייל:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>סיסמה:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </div>
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                <button type="submit" style={{ marginTop: 20, width: '100%' }}>
                    התחבר
                </button>
            </form>
        </div>
    );
};

export default Login;
