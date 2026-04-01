const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function seedData() {
    const connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345678',
        database: process.env.DB_NAME || 'ai_chatbot'
    };

    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('✅ Connected to MySQL database.');

        const [[user]] = await connection.execute('SELECT id FROM users LIMIT 1');
        if (!user) {
            console.log('⚠️ No users found. Please sign up first.');
            await connection.end();
            return;
        }

        const userId = user.id;

        // Seed Habits
        await connection.execute('INSERT INTO habits (user_id, name, xp_reward) VALUES (?, ?, ?)', [userId, 'Daily Pushups', 15]);
        await connection.execute('INSERT INTO habits (user_id, name, xp_reward) VALUES (?, ?, ?)', [userId, 'Read 10 Pages', 10]);

        // Seed Tasks (Quests)
        await connection.execute('INSERT INTO tasks (user_id, title, xp_reward) VALUES (?, ?, ?)', [userId, 'Complete AI System Logic', 50]);
        await connection.execute('INSERT INTO tasks (user_id, title, xp_reward) VALUES (?, ?, ?)', [userId, '1 Hour Cardio Session', 40]);

        // Seed Skills
        await connection.execute('INSERT INTO skills (user_id, name, level, xp, icon) VALUES (?, ?, ?, ?, ?)', [userId, 'Strength', 1, 30, 'flame']);
        await connection.execute('INSERT INTO skills (user_id, name, level, xp, icon) VALUES (?, ?, ?, ?, ?)', [userId, 'Agility', 1, 45, 'zap']);

        console.log('✅ Sample data seeded for user ID:', userId);
        await connection.end();
    } catch (error) {
        console.error('❌ Error during seeding:', error.message);
    }
}

seedData();
