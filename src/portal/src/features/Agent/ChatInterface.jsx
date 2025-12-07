import React, { useState, useEffect, useRef } from 'react';
import { List, Input, Button, Upload, Select, Typography, Card, Space, Avatar } from 'antd';
import { SendOutlined, PaperClipOutlined, UserOutlined, RobotOutlined, AudioOutlined } from '@ant-design/icons';
import { useTheme } from '../../context/ThemeContext';
import testChatData from '../../data/test_agent_chat_reply.json';

const { TextArea } = Input;
const { Text, Link } = Typography;

const ChatInterface = ({ userRole, selectedExpert }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [currentExpert, setCurrentExpert] = useState(selectedExpert); // Local state if needed, or sync with provider
    const messagesEndRef = useRef(null);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        // Load initial test data simulating history
        // Transform the test data to our internal format if necessary, or use as is
        const loadedMessages = testChatData.map(item => [
            {
                id: `u-${item.sequence}`,
                sender: 'user',
                text: item.userMessage,
                timestamp: new Date().toLocaleTimeString()
            },
            {
                id: `a-${item.sequence}`,
                sender: 'agent',
                text: item.agentReply,
                action: item.actionRecommended,
                timestamp: new Date().toLocaleTimeString()
            }
        ]).flat();

        setMessages(loadedMessages);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');

        // Pseudo-response
        setTimeout(() => {
            const newAgentMsg = {
                id: Date.now() + 1,
                sender: 'agent',
                text: `I am ${selectedExpert || 'the Agent'}. I received: "${inputValue}"`,
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, newAgentMsg]);
        }, 1000);
    };

    const experts = [
        { value: 'General Agent', label: 'General Agent' },
        { value: 'Equipment Maintenance', label: 'Equipment Expert' },
        { value: 'Process Expert', label: 'Process Expert' },
        { value: 'Manufacture Expert', label: 'Manufacture Expert' },
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden' // Prevent outer scroll
        }}>
            {/* Messages Area - Takes remaining space and scrolls */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px 24px 0 24px', // Reduced bottom padding
                display: 'flex',
                flexDirection: 'column'
            }}>
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    split={false}
                    renderItem={(msg) => (
                        <List.Item style={{
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            border: 'none',
                            padding: '8px 0'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                gap: 12,
                                maxWidth: '70%'
                            }}>
                                <Avatar
                                    icon={msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                                    style={{
                                        backgroundColor: msg.sender === 'user' ? '#1890ff' : '#52c41a',
                                        flexShrink: 0
                                    }}
                                />
                                <Card
                                    size="small"
                                    style={{
                                        borderRadius: 16,
                                        borderTopRightRadius: msg.sender === 'user' ? 4 : 16,
                                        borderTopLeftRadius: msg.sender === 'agent' ? 4 : 16,
                                        background: msg.sender === 'user'
                                            ? (isDarkMode ? '#177ddc' : '#e6f7ff')
                                            : (isDarkMode ? '#1f1f1f' : '#fff')
                                    }}
                                    bodyStyle={{ padding: '8px 12px' }}
                                >
                                    <Text style={{ color: isDarkMode ? '#fff' : 'inherit' }}>{msg.text}</Text>
                                    {msg.action && (
                                        <div style={{ marginTop: 8, padding: 8, background: 'rgba(0,0,0,0.05)', borderRadius: 4 }}>
                                            <Space direction="vertical" size={0}>
                                                <Text type="secondary" style={{ fontSize: 12 }}>Recommended Action:</Text>
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() => window.open(msg.action.parameters.url, '_blank')}
                                                >
                                                    {msg.action.type === 'open_url' ? `Open ${msg.action.parameters.url}` : 'Action'}
                                                </Button>
                                            </Space>
                                        </div>
                                    )}
                                    <div style={{ textAlign: 'right', marginTop: 4 }}>
                                        <Text type="secondary" style={{ fontSize: 10 }}>{msg.timestamp}</Text>
                                    </div>
                                </Card>
                            </div>
                        </List.Item>
                    )}
                />
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom via Flexbox (not absolute) */}
            <div style={{
                padding: '16px 24px',
                background: isDarkMode ? '#141414' : '#fff',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                gap: 16,
                alignItems: 'flex-end',
                flexShrink: 0 // Prevent shrinking
            }}>
                {/* File Uploader (Left) */}
                <Upload>
                    <Button icon={<PaperClipOutlined />} />
                </Upload>

                {/* Main Input */}
                <div style={{ flex: 1 }}>
                    <TextArea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message... (Alt + Enter to send)"
                        autoSize={{ minRows: 5, maxRows: 8 }}
                        maxLength={1000}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.altKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                </div>

                {/* Expert Selector (Right) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text type="secondary" style={{ fontSize: 10 }}>Talking to:</Text>
                    <Select
                        defaultValue="General Agent"
                        style={{ width: 160 }}
                        options={experts}
                        value={selectedExpert}
                    />
                </div>

                <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
                <Button icon={<AudioOutlined />} />
            </div>
        </div>
    );
};

export default ChatInterface;
