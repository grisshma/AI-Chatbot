import React from 'react';
import { LogOut, Sun, Moon, MessageSquare, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ history, onNewChat, activeChatId }) => {
    const { logout, user } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div className="flex flex-col h-full w-64 md:w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
            {/* New Chat Button */}
            <div className="p-4">
                <button
                    onClick={onNewChat}
                    className="flex items-center justify-center w-full px-4 py-3 space-x-2 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                >
                    <PlusCircle size={18} />
                    <span>New Chat</span>
                </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
                <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Previous Conversations</p>
                {history.length === 0 ? (
                    <div className="px-3 py-4 text-sm text-gray-400 italic">No history yet</div>
                ) : (
                    history.slice().reverse().map((chat) => (
                        <button
                            key={chat.id}
                            className={`flex items-center w-full px-3 py-3 space-x-3 text-sm text-left rounded-xl transition-all ${
                                activeChatId === chat.id 
                                ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                            }`}
                        >
                            <MessageSquare size={16} className="shrink-0" />
                            <span className="truncate">{chat.message}</span>
                        </button>
                    ))
                )}
            </div>

            {/* User Profile & Footer */}
            <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-800">
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center w-full px-4 py-2.5 space-x-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-xl transition-all"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <div className="flex items-center px-4 py-3 space-x-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center font-bold text-xs">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.username}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2.5 space-x-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
