import React from 'react';

interface CopyrightProps {
    className?: string;
}

const Copyright: React.FC<CopyrightProps> = ({ className = '' }) => {
    return (
        <div className={`copyright ${className}`.trim()}>
            © {new Date().getFullYear()} BankHub. All rights reserved.
        </div>
    );
};

export default Copyright;
