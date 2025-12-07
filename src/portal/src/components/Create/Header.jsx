import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Badge, Dropdown, Space, Input, Modal, Tree, message } from 'antd';
import {
    AppstoreOutlined,
    SearchOutlined,
    UserOutlined,
    GlobalOutlined,
    SettingOutlined,
    BellOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import bookmarkConfig from '../../data/bookmark_config.json';
import funcTreeData from '../../data/func_tree.json';

const { Header: AntHeader } = Layout;

const Header = ({ mode, setMode, userRole, setUserRole }) => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedApps, setSelectedApps] = useState([]);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedApps([]);
    };
    const handleOk = () => {
        if (selectedApps.length > 0) {
            message.success(`Added ${selectedApps.length} apps to bookmarks!`);
        }
        setIsModalOpen(false);
    };

    const onCheck = (checkedKeys, info) => {
        // Filter only leaf nodes (Apps) if desired, or allow any
        // Here we just store the keys
        setSelectedApps(checkedKeys);
    };

    const userMenuProps = {
        items: [
            { key: 'user', label: 'User Mode', onClick: () => setUserRole('User') },
            { key: 'expert', label: 'Expert Mode', onClick: () => setUserRole('Expert') },
            { key: 'admin', label: 'Admin Mode', onClick: () => setUserRole('Admin') },
            { type: 'divider' },
            { key: 'theme', label: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`, onClick: toggleTheme },
            { key: 'settings', label: 'Settings', icon: <SettingOutlined /> }
        ]
    };

    return (
        <AntHeader style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            background: isDarkMode ? '#141414' : '#fff',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
            {/* Left: Mode Switcher & Bookmarks */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', color: isDarkMode ? '#fff' : '#000' }}>Agent Portal</h2>
                <Button.Group>
                    <Button
                        type={mode === 'agent' ? 'primary' : 'default'}
                        onClick={() => setMode('agent')}
                    >
                        Agent
                    </Button>
                    <Button
                        type={mode === 'communication' ? 'primary' : 'default'}
                        onClick={() => setMode('communication')}
                    >
                        Comm
                    </Button>
                </Button.Group>

                {/* Visual Separator */}
                <div style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.1)', margin: '0 8px' }} />

                {/* Bookmarks */}
                <Space size="middle">
                    {bookmarkConfig.slice(0, 5).map(bm => (
                        <div key={bm.id} title={bm.description} style={{ cursor: 'pointer', opacity: 0.9 }}>
                            <Avatar
                                shape="square"
                                size="small"
                                src={bm.icon}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        </div>
                    ))}
                    {/* Add Bookmark Button (Opens Modal) */}
                    <Button type="dashed" icon={<PlusOutlined />} shape="circle" size="small" onClick={showModal} />

                    {/* Search */}
                    <Input
                        placeholder="Search apps..."
                        prefix={<SearchOutlined />}
                        bordered={false}
                        style={{ width: 150, background: 'rgba(0,0,0,0.05)', borderRadius: 4 }}
                    />
                </Space>
            </div>

            {/* Right: User Profile */}
            <Space size="large">
                <Badge count={5} size="small">
                    <Button type="text" icon={<BellOutlined />} shape="circle" />
                </Badge>
                <Dropdown menu={userMenuProps} trigger={['click']}>
                    <Space style={{ cursor: 'pointer' }}>
                        <Badge count={3} dot offset={[-5, 5]}>
                            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#87d068' }} />
                        </Badge>
                        <span style={{ color: isDarkMode ? '#fff' : '#000' }}>
                            Alex ({userRole})
                        </span>
                    </Space>
                </Dropdown>
            </Space>

            {/* Add App Modal */}
            <Modal
                title="Add Application to Bookmarks"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Add Selected"
            >
                <div style={{ marginBottom: 16 }}>
                    <Input prefix={<SearchOutlined />} placeholder="Search in tree..." />
                </div>
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                    <Tree
                        checkable
                        defaultExpandAll
                        treeData={funcTreeData}
                        onCheck={onCheck}
                    />
                </div>
            </Modal>
        </AntHeader>
    );
};

export default Header;
