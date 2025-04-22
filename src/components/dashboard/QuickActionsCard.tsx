import React from 'react';

interface QuickActionsCardProps {
    onShowToast: (message: string, type: 'info' | 'success' | 'error') => void;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ onShowToast }) => {
    return (
        <div className="quick-actions-card">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="quick-actions-grid">
                <button
                    onClick={() =>
                        onShowToast(
                            "Loan feature coming soon! We're working on making it available.",
                            'info'
                        )
                    }
                    className="feature-button"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a73e8"
                        strokeWidth="2"
                        className="feature-icon"
                    >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <div className="feature-text">Loan</div>
                </button>
                <button
                    onClick={() =>
                        onShowToast(
                            'Request Payment feature coming soon! Stay tuned for updates.',
                            'info'
                        )
                    }
                    className="feature-button"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a73e8"
                        strokeWidth="2"
                        className="feature-icon"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <div className="feature-text">Request Payment</div>
                </button>
            </div>
        </div>
    );
};

export default QuickActionsCard;
