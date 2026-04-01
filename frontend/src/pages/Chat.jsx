import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Menu, X, MessageSquare, AlertCircle } from 'lucide-react';

const Chat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Fetch chat history
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get(`/chat/history/${user.id}`);
                setHistory(response.data.chats || []);
                
                // If there's history, load the messages from the most recent one (optional)
                // For this MVP, we load ALL history into the chat view for simplicity
                const allMessages = [];
                response.data.chats.forEach(chat => {
                    allMessages.push({ text: chat.message, isBot: false, id: chat.id + '_u' });
                    allMessages.push({ text: chat.response, isBot: true, id: chat.id + '_b' });
                });
                setMessages(allMessages);
            } catch (err) {
                console.error("Failed to fetch history:", err);
            }
        };

        if (user) fetchHistory();
    }, [user]);

    const handleSendMessage = async (text) => {
        const userMsg = { text, isBot: false, id: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/chat', { message: text });
            const botMsg = { 
                text: response.data.chat.response, 
                isBot: true, 
                id: response.data.chat.id + '_b' 
            };
            setMessages(prev => [...prev, botMsg]);
            
            // Update history locally
            setHistory(prev => [...prev, response.data.chat]);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to get response from AI. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
            {/* Sidebar Desktop */}
            <div className="hidden md:block">
                <Sidebar history={history} onNewChat={handleNewChat} />
            </div>

            {/* Sidebar Mobile */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm">
                    <div className="absolute left-0 top-0 bottom-0 w-64 shadow-2xl animate-slide-in">
                        <div className="relative h-full">
                            <button 
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute -right-12 top-4 p-2 bg-white/10 text-white rounded-full"
                            >
                                <X size={24} />
                            </button>
                            <Sidebar history={history} onNewChat={handleNewChat} />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400"
                        >
                            <Menu size={20} />
                        </button>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                <MessageSquare size={18} className="text-white" />
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white hidden sm:inline">AI Chat Assistant</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-xs text-green-500 font-medium">Online</span>
                        </div>
                    </div>
                </header>

                {/* Messages Area */}
                <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 scroll-smooth">
                    <div className="max-w-4xl mx-auto w-full">
                        {messages.length === 0 ? (
                            <div className="h-[70vh] flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                                    <MessageSquare size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How can I help you today?</h2>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                    Start a conversation with our smart AI assistant. Ask questions, get help with code, or just say hello!
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg) => (
                                    <ChatMessage key={msg.id} message={msg.text} isBot={msg.isBot} />
                                ))}
                                {isLoading && <TypingIndicator />}
                                {error && (
                                    <div className="flex justify-center my-4">
                                        <div className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/30">
                                            <AlertCircle size={16} />
                                            <span>{error}</span>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {/* Input Area */}
                <footer className="p-4 bg-transparent">
                    <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
                    <p className="text-center text-[10px] text-gray-400 mt-2">
                        AI can make mistakes. Consider checking important information.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Chat;
