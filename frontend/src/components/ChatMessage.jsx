import React from 'react';
import { User, MessageSquare } from 'lucide-react';

const ChatMessage = ({ message, isBot }) => {
    return (
        <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex max-w-[80%] md:max-w-[70%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isBot ? 'bg-blue-600 mr-3' : 'bg-gray-600 ml-3'}`}>
                    {isBot ? <MessageSquare size={18} className="text-white" /> : <User size={18} className="text-white" />}
                </div>
                <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                    isBot 
                    ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700' 
                    : 'bg-blue-600 text-white'
                }`}>
                    <p className="text-sm md:text-base whitespace-pre-wrap">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
