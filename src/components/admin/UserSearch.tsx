import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import '../../styles/components/admin/UserSearch.css';

interface UserSearchProps {
    onSearch: (searchTerm: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className="user-search">
            <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search users by name or email..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                />
                {searchTerm && (
                    <button
                        className="search-clear-button"
                        onClick={clearSearch}
                        title="Clear search"
                    >
                        <FaTimes />
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserSearch;
