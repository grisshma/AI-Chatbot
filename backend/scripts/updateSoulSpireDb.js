const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function updateDatabase() {
    const connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345678',
        database: process.env.DB_NAME || 'ai_chatbot'
    };

    console.log('Connecting to MySQL with user:', connectionConfig.user);

    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('✅ Connected to MySQL database.');

        const sqlPath = path.join(__dirname, '../database/solo_leveling_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by semicolon but handle potential issues with multi-line statements
        // For this schema, splitting by ; works fine
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`Executing ${statements.length} SQL statements...`);

        for (const statement of statements) {
            try {
                await connection.query(statement);
                console.log(`Successfully executed: ${statement.substring(0, 50)}...`);
            } catch (err) {
                if (err.code === 'ER_DUP_FIELDNAME') {
                    console.log(`- Column already exists, skipping.`);
                } else {
                    console.warn(`- Error executing statement: ${err.message}`);
                }
            }
        }

        console.log('✅ Database schema updated successfully!');
        await connection.end();
    } catch (error) {
        console.error('❌ Error during database update:', error.message);
    }
}

updateDatabase();
