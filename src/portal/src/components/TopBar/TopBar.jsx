import React, { useState } from 'react';
import {
    Plus, LayoutGrid, Github, Mail, Globe,
    MessageSquare, Bot, Search, Settings,
    User, Shield, ChevronDown
} from 'lucide-react';
import './TopBar.css';

const TopBar = ({ mode, setMode, userRole, setUserRole }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMode = () => {
        setMode(mode === 'agent' ? 'communication' : 'agent');
    };

    const roles = ['User', 'Expert', 'Admin'];

    return (
        <div className="topbar">
            {/* Left: Mode Switcher */}
            <div className="topbar-left">
                <div className="mode-switcher" onClick={toggleMode} title={`Switch to ${mode === 'agent' ? 'Communication' : 'Agent'} Mode`}>
                    <div className={`mode-icon ${mode === 'agent' ? 'active' : ''}`}>
                        <Bot size={20} />
                        {mode === 'agent' && <span>Agent</span>}
                    </div>
                    <div className={`mode-icon ${mode === 'communication' ? 'active' : ''}`}>
                        <MessageSquare size={20} />
                        {mode === 'communication' && <span>Comm</span>}
                    </div>
                </div>
            </div>

            {/* Center/Right: Bookmarks & Search */}
            <div className="topbar-center">
                <div className="bookmark-bar">
                    <div className="search-wrapper">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Find app..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="divider"></div>
                    <div className="bookmark-item" title="Jira"><LayoutGrid size={18} /></div>
                    <div className="bookmark-item" title="GitHub"><Github size={18} /></div>
                    <div className="bookmark-item" title="Outlook"><Mail size={18} /></div>
                    <button className="bookmark-item add-bookmark" title="Add App">
                        <Plus size={18} />
                    </button>
                </div>
            </div>

            {/* Right: User Profile */}
            <div className="topbar-right">
                <div
                    className="user-profile"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <div className="avatar">AL</div>
                    <div className="user-info">
                        <span className="user-name">Alex Lee</span>
                        <span className="user-role">{userRole}</span>
                    </div>
                    <ChevronDown size={14} className={`dropdown-arrow ${isProfileOpen ? 'rotate' : ''}`} />

                    {isProfileOpen && (
                        <div className="profile-dropdown">
                            <div className="dropdown-header">Switch Role</div>
                            {roles.map(role => (
                                <div
                                    key={role}
                                    className={`dropdown-item ${userRole === role ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setUserRole(role);
                                        setIsProfileOpen(false);
                                    }}
                                >
                                    {role === 'Admin' ? <Shield size={14} /> : <User size={14} />}
                                    <span>{role}</span>
                                </div>
                            ))}
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item">
                                <Settings size={14} />
                                <span>Settings</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
