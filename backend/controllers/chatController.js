const pool = require('../database/db');
const aiService = require('../services/aiService');

exports.chat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id; // from authMiddleware

        if (!message) {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // 1. Get response from AI Service
        const aiResponse = await aiService.generateAIResponse(message);

        // 2. Save both to database
        const [result] = await pool.execute(
            'INSERT INTO chats (user_id, message, response) VALUES (?, ?, ?)',
            [userId, message, aiResponse]
        );

        // 3. Return response to client
        const newChat = {
            id: result.insertId,
            user_id: userId,
            message: message,
            response: aiResponse,
            created_at: new Date()
        };

        res.status(200).json({ chat: newChat });
    } catch (error) {
        console.error("Chat Controller Error:", error.message);
        res.status(500).json({ error: error.message || 'Failed to process chat message.' });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        // Verify requested userId matches token userId, or just use token userId
        const targetUserId = req.params.userId;
        if (userId.toString() !== targetUserId.toString()) {
            return res.status(403).json({ error: 'Forbidden: Cannot access other users history.' });
        }

        const [chats] = await pool.execute(
            'SELECT * FROM chats WHERE user_id = ? ORDER BY created_at ASC',
            [userId]
        );

        res.status(200).json({ chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch chat history.' });
    }
};
