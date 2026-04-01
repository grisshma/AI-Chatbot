import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Menu, X, MessageSquare, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Chat = () => {
    const navigate = useNavigate();
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
        <div className="flex h-screen bg-[#0a0a14] relative overflow-hidden font-['Outfit']">
            <div className="soulspire-bg"></div>
            <div className="floating-particles"></div>

            {/* Sidebar Desktop */}
            <div className="hidden lg:block w-80 glass-panel border-r border-white/5 relative z-20 overflow-y-auto">
                <div className="p-8 flex flex-col gap-10">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                            <img src="/logo.png" className="w-6 h-6 object-contain" alt="Logo" />
                        </div>
                        <span className="text-xl font-black italic tracking-tighter uppercase neon-text-purple">SoulSpire</span>
                    </div>

                    <div className="space-y-4">
                        <button 
                            onClick={handleNewChat}
                            className="w-full py-4 rounded-2xl bg-purple-600 text-black font-black uppercase tracking-widest text-[10px] shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-98 transition-all"
                        >
                            Initialize New Terminal
                        </button>
                        
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-2">Previous Logs</span>
                            {history.slice(0, 10).map((chat, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 cursor-pointer transition-all group">
                                    <p className="text-[10px] font-bold uppercase tracking-tight text-gray-400 truncate group-hover:text-white">{chat.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative z-10">
                <header className="h-20 flex items-center justify-between px-8 glass-panel border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl border border-purple-500/30 p-0.5 bg-white/5 relative">
                                <img src="/companion_general.png" className="w-full h-full rounded-[10px] object-cover" alt="Companion" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a14] animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-xl font-black italic uppercase tracking-tighter neon-text-purple">Soul Terminal</h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Agent Spire Online</span>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/')}
                        className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        Return to Dashboard
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto px-8 py-10 scroll-smooth">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {messages.length === 0 ? (
                            <div className="h-[60vh] flex flex-col items-center justify-center text-center">
                                <div className="w-24 h-24 mb-8 opacity-20">
                                    <MessageSquare size={96} className="text-purple-600" />
                                </div>
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Initialize Connection</h2>
                                <p className="text-gray-500 max-w-md font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                                    "I am Agent Spire. Your personal evolution is my primary objective. How shall we progress today, Master?"
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, i) => (
                                    <motion.div 
                                        key={msg.id || i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-6 ${msg.isBot ? '' : 'flex-row-reverse'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl overflow-hidden border ${msg.isBot ? 'border-purple-500/30' : 'border-pink-500/30'} flex-shrink-0`}>
                                            <img src={msg.isBot ? "/companion_general.png" : "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} className="w-full h-full object-cover" alt="Avatar" />
                                        </div>
                                        <div className={`max-w-[80%] p-6 rounded-3xl text-sm font-bold leading-relaxed ${
                                            msg.isBot 
                                            ? 'glass-panel border-purple-500/10 text-white italic shadow-[0_0_15px_rgba(157,80,187,0.05)] shadow-inner' 
                                            : 'bg-white/5 border border-white/5 text-gray-300'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-6">
                                        <div className="w-10 h-10 rounded-xl border border-purple-500/30 flex items-center justify-center bg-white/5">
                                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                        <div className="glass-panel p-6 rounded-3xl border border-purple-500/10 opacity-50 italic text-xs uppercase tracking-widest">
                                            Synchronizing context...
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                <footer className="p-8">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[30px] blur opacity-25 group-focus-within:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative">
                            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em] mt-6">
                        System Link: Secured // Contextual Matrix Active
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Chat;
