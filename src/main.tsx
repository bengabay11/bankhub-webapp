import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/common.css';
import './styles/pages/Login.css';
import './styles/pages/Register.css';
import './styles/pages/Dashboard.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
