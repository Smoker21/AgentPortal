import React, { useState } from 'react';
import { Bot, ChevronDown, Check } from 'lucide-react';
import './Sidebar.css'; // Reusing sidebar styles for consistency

const ExpertSelector = ({ selectedExpert, setSelectedExpert }) => {
    const [isOpen, setIsOpen] = useState(false);

    const experts = [
        { id: 'general', name: 'General Agent', type: 'default' },
        { id: 'maint', name: 'Equipment Maintenance', type: 'domain' },
        { id: 'sop', name: 'My SOP', type: 'domain' },
        { id: 'cmd', name: 'Command Mode', type: 'domain' }
    ];

    return (
        <div className="expert-selector-container">
            <div className="expert-selector-header" onClick={() => setIsOpen(!isOpen)}>
                <div className="current-expert">
                    <Bot size={18} className="expert-icon" />
                    <span className="expert-name">{selectedExpert}</span>
                </div>
                <ChevronDown size={16} className={`arrow ${isOpen ? 'rotate' : ''}`} />
            </div>

            {isOpen && (
                <div className="expert-dropdown">
                    {experts.map(expert => (
                        <div
                            key={expert.id}
                            className={`expert-option ${selectedExpert === expert.name ? 'active' : ''}`}
                            onClick={() => {
                                setSelectedExpert(expert.name);
                                setIsOpen(false);
                            }}
                        >
                            <span>{expert.name}</span>
                            {selectedExpert === expert.name && <Check size={14} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpertSelector;
