-- Habits Table - Track daily consistency
CREATE TABLE IF NOT EXISTS habits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    streak INT DEFAULT 0,
    last_completed DATE,
    xp_reward INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Skills/Attributes Table - RPG-style attribute tracking
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    level INT DEFAULT 1,
    xp INT DEFAULT 0,
    max_xp INT DEFAULT 100,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tasks/Schedule Table - Daily quest board
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    due_date DATETIME,
    xp_reward INT DEFAULT 20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sport Statistics Table - Tracking physical progress
CREATE TABLE IF NOT EXISTS sport_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_name VARCHAR(100) NOT NULL,
    value DECIMAL(10, 2),
    unit VARCHAR(20),
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed initial skills/attributes for all users (ideally done on signup, but let's add them here)
-- We can't easily seed for ALL existing users without a script, but we can update the users table.
ALTER TABLE users ADD COLUMN level INT DEFAULT 1;
ALTER TABLE users ADD COLUMN xp INT DEFAULT 0;
ALTER TABLE users ADD COLUMN max_xp INT DEFAULT 100;
ALTER TABLE users ADD COLUMN title VARCHAR(100) DEFAULT 'E-Rank Hunter';
ALTER TABLE users ADD COLUMN coins INT DEFAULT 0;
