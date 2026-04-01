-- Expansion for SoulSpire Advanced Features

-- 1. Categories for Tasks (Study, Sports, General)
ALTER TABLE tasks ADD COLUMN category ENUM('general', 'study', 'sports') DEFAULT 'general';

-- 2. Daily Schedules
CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Routine Items (e.g., 8:00 AM - Breakfast)
CREATE TABLE IF NOT EXISTS routine_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME,
    activity VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
);

-- 4. Mode Selection (Stored in User profile)
ALTER TABLE users ADD COLUMN active_mode ENUM('general', 'study', 'sports') DEFAULT 'general';
