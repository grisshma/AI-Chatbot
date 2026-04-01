import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="flex items-center space-x-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit ml-11 mb-6">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
    );
};

export default TypingIndicator;
