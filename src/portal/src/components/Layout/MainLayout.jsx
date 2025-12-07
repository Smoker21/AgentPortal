import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Create/Header';
import ChatInterface from '../../features/Agent/ChatInterface';
import { useTheme } from '../../context/ThemeContext';

const { Content } = Layout;

const MainLayout = () => {
    const [mode, setMode] = useState('agent'); // 'agent' | 'communication'
    const [userRole, setUserRole] = useState('User'); // 'User' | 'Expert' | 'Admin'
    const [selectedExpert, setSelectedExpert] = useState('General Agent');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { isDarkMode } = useTheme();

    return (
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
            <Header
                mode={mode}
                setMode={setMode}
                userRole={userRole}
                setUserRole={setUserRole}
            />
            <Layout style={{ height: 'calc(100vh - 64px)' }}> {/* Assuming Header is 64px */}
                <Sidebar
                    mode={mode}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    userRole={userRole}
                    selectedExpert={selectedExpert}
                    setSelectedExpert={setSelectedExpert}
                />
                <Content style={{
                    padding: 0,
                    background: isDarkMode ? '#000' : '#f0f2f5',
                    position: 'relative',
                    height: '100%',
                    overflow: 'hidden' // Content area itself should not scroll, inner components will
                }}>
                    {mode === 'agent' ? (
                        <ChatInterface userRole={userRole} selectedExpert={selectedExpert} />
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: isDarkMode ? '#aaa' : '#666'
                        }}>
                            <div>
                                <h2>Communication Hub</h2>
                                <p>Channel: General</p>
                            </div>
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
