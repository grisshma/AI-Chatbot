const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function setupDatabase() {
    const connectionConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    };

    console.log('Connecting to MySQL with user:', connectionConfig.user);

    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('✅ Connected to MySQL server.');

        const sqlPath = path.join(__dirname, '../../database.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split by semicolon but handle potential issues with multi-line statements
        // For this specific database.sql, splitting by ; works fine
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`Executing ${statements.length} SQL statements...`);

        for (const statement of statements) {
            await connection.query(statement);
        }

        console.log('✅ Database and tables created successfully!');
        await connection.end();
    } catch (error) {
        console.error('❌ Error during database setup:', error.message);
        console.log('\nTip: Make sure your DB_PASSWORD in backend/.env is correct.');
    }
}

setupDatabase();
