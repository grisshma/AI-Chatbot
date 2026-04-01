import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [message]);

    return (
        <form onSubmit={handleSubmit} className="relative flex items-end w-full max-w-4xl mx-auto p-4">
            <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={disabled}
                rows={1}
                className="w-full p-4 pr-14 text-sm md:text-base border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none shadow-lg transition-all"
            />
            <button
                type="submit"
                disabled={!message.trim() || disabled}
                className={`absolute right-7 bottom-7 p-2 rounded-xl transition-all ${
                    !message.trim() || disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20'
                }`}
            >
                <Send size={20} />
            </button>
        </form>
    );
};

export default ChatInput;
