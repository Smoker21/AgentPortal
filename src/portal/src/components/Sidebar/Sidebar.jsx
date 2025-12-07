import React from 'react';
import { Layout, Menu, Button, Typography, Badge, Space, Dropdown } from 'antd';
import {
    MessageOutlined,
    PushpinOutlined,
    HistoryOutlined,
    UserOutlined,
    TeamOutlined,
    RobotOutlined,
    PlusCircleOutlined,
    MoreOutlined
} from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import agentData from '../../data/test_agent_left_panel.json';
import commData from '../../data/test_communication_left_panel.json';

const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = ({ mode, isSidebarOpen, toggleSidebar, userRole, selectedExpert, setSelectedExpert }) => {
    const { isDarkMode } = useTheme();

    // Menu Items Construction
    const getMenuItems = () => {
        if (mode === 'agent') {
            return [
                {
                    key: 'new-chat',
                    label: <div style={{ textAlign: 'center', fontWeight: 'bold' }}>+ New Conversation</div>,
                    style: { background: isDarkMode ? '#1f1f1f' : '#e6f7ff', color: '#1890ff', marginBottom: 16 }
                },
                {
                    key: 'pinned',
                    label: 'Pinned',
                    type: 'group',
                    children: agentData.pinnedChats.map(item => ({ ...item, icon: <PushpinOutlined /> }))
                },
                {
                    key: 'experts',
                    label: 'My Experts',
                    type: 'group',
                    children: [
                        ...agentData.myExperts.map(item => ({ ...item, icon: <RobotOutlined /> })),
                        ...(userRole === 'Expert' || userRole === 'Admin' ? [{
                            key: 'create-expert',
                            label: 'Create Expert',
                            icon: <PlusCircleOutlined style={{ color: '#1890ff' }} />
                        }] : [])
                    ]
                },
                { type: 'divider' },
                {
                    key: 'history-title',
                    label: <span style={{ color: isDarkMode ? '#aaa' : '#888', fontSize: '12px', paddingLeft: 10 }}>Conversation History</span>,
                    type: 'group',
                    children: [],
                    style: { marginBottom: 0, paddingBottom: 0 }
                },
                ...agentData.historyChats.map(group => ({
                    key: group.key,
                    label: group.label,
                    type: 'group',
                    children: group.children.map(child => ({
                        key: child.key,
                        label: (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>{child.label}</span>
                                <span style={{ fontSize: 10, color: '#999' }}>{child.timestamp}</span>
                            </div>
                        ),
                        icon: <HistoryOutlined />
                    }))
                }))
            ];
        } else {
            return [
                {
                    key: 'channels',
                    label: 'Channels',
                    type: 'group',
                    children: commData.channels.map(ch => ({
                        key: ch.key,
                        label: (
                            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                <span># {ch.label}</span>
                                {ch.count > 0 && <Badge count={ch.count} size="small" style={{ backgroundColor: '#52c41a' }} />}
                            </Space>
                        )
                    }))
                },
                {
                    key: 'dms',
                    label: 'Direct Messages',
                    type: 'group',
                    children: commData.dms.map(dm => ({
                        key: dm.key,
                        label: (
                            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                <Badge status={dm.status === 'online' ? 'success' : 'error'} />
                                {dm.label}
                                {dm.count > 0 && <Badge count={dm.count} size="small" />}
                            </Space>
                        )
                    }))
                }
            ];
        }
    };

    // Expert Selector Menu
    const expertItems = [
        { key: 'general', label: 'General Agent', onClick: () => setSelectedExpert('General Agent') },
        { key: 'maint', label: 'Equipment Maintenance', onClick: () => setSelectedExpert('Equipment Maintenance') },
        { key: 'process', label: 'Process Expert', onClick: () => setSelectedExpert('Process Expert') },
        { key: 'manuf', label: 'Manufacture Expert', onClick: () => setSelectedExpert('Manufacture Expert') },
    ];

    return (
        <Sider
            collapsible
            collapsed={!isSidebarOpen}
            onCollapse={(value) => toggleSidebar(!value)}
            width={260}
            theme={isDarkMode ? 'dark' : 'light'}
            style={{
                borderRight: '1px solid rgba(0,0,0,0.06)',
                height: 'calc(100vh - 64px)', // Deduct header height
                display: 'flex',
                flexDirection: 'column'
            }}
            trigger={null}
        >
            {/* Simple Toggle if needed, or rely on layout trigger */}

            <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 60 }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['new-chat']}
                    style={{ borderRight: 0 }}
                    items={getMenuItems()}
                />
            </div>

            {/* Expert Selector Footer (Agent Mode Only) */}
            {mode === 'agent' && isSidebarOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: 16,
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    background: isDarkMode ? '#001529' : '#fff'
                }}>
                    <Dropdown menu={{ items: expertItems }} placement="top" trigger={['click']}>
                        <Button block style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space>
                                <RobotOutlined />
                                <span>{selectedExpert}</span>
                            </Space>
                            <MoreOutlined />
                        </Button>
                    </Dropdown>
                </div>
            )}
        </Sider>
    );
};

export default Sidebar;
