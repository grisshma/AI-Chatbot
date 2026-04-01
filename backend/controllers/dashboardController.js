const pool = require('../database/db');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get user progress and active mode
        const [[user]] = await pool.execute(
            'SELECT username, email, level, xp, max_xp, title, coins, active_mode FROM users WHERE id = ?',
            [userId]
        );

        // 2. Get habits (General + filtered by mode if needed)
        const [habits] = await pool.execute(
            'SELECT * FROM habits WHERE user_id = ?',
            [userId]
        );

        // 3. Get skills
        const [skills] = await pool.execute(
            'SELECT * FROM skills WHERE user_id = ?',
            [userId]
        );

        // 4. Get tasks (Filtered by active mode or category)
        const [tasks] = await pool.execute(
            'SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC',
            [userId]
        );

        // 5. Get schedules and routine items
        const [schedules] = await pool.execute(
            'SELECT id, title, description, is_active FROM schedules WHERE user_id = ? AND is_active = TRUE',
            [userId]
        );

        let routine = [];
        if (schedules.length > 0) {
            const [items] = await pool.execute(
                'SELECT * FROM routine_items WHERE schedule_id = ? ORDER BY time_start ASC',
                [schedules[0].id]
            );
            routine = items;
        }

        res.status(200).json({
            user,
            habits,
            skills,
            tasks,
            schedules,
            routine
        });
    } catch (error) {
        console.error("Dashboard Controller Error:", error);
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
};

exports.completeHabit = async (req, res) => {
    try {
        const userId = req.user.id;
        const { habitId } = req.params;

        const [[habit]] = await pool.execute('SELECT xp_reward FROM habits WHERE id = ? AND user_id = ?', [habitId, userId]);
        if (!habit) return res.status(404).json({ error: 'Habit not found.' });

        await pool.execute(
            'UPDATE habits SET streak = streak + 1, last_completed = CURRENT_DATE WHERE id = ?',
            [habitId]
        );

        await rewardXP(userId, habit.xp_reward);
        res.status(200).json({ message: 'Habit completed!', xp_gained: habit.xp_reward });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.completeTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;

        const [[task]] = await pool.execute('SELECT xp_reward FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
        if (!task) return res.status(404).json({ error: 'Task not found.' });

        await pool.execute('UPDATE tasks SET status = "completed" WHERE id = ?', [taskId]);
        await rewardXP(userId, task.xp_reward);
        res.status(200).json({ message: 'Task completed!', xp_gained: task.xp_reward });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMode = async (req, res) => {
    try {
        const userId = req.user.id;
        const { mode } = req.body; // 'general', 'study', 'sports'

        if (!['general', 'study', 'sports'].includes(mode)) {
            return res.status(400).json({ error: 'Invalid mode.' });
        }

        await pool.execute('UPDATE users SET active_mode = ? WHERE id = ?', [mode, userId]);
        res.status(200).json({ message: `Switched to ${mode} mode.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.completeRoutineItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        await pool.execute('UPDATE routine_items SET is_completed = !is_completed WHERE id = ?', [itemId]);
        res.status(200).json({ message: 'Routine item updated.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Habits CRUD
exports.createHabit = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, icon, color, xp_reward } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO habits (user_id, name, icon, color, xp_reward) VALUES (?, ?, ?, ?, ?)',
            [userId, name, icon || 'Flame', color || 'from-purple-600 to-pink-500', xp_reward || 10]
        );
        res.status(201).json({ id: result.insertId, message: 'Habit created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        const userId = req.user.id;
        const { habitId } = req.params;
        await pool.execute('DELETE FROM habits WHERE id = ? AND user_id = ?', [habitId, userId]);
        res.status(200).json({ message: 'Habit deleted.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tasks CRUD
exports.createTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, category, due_date, xp_reward } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO tasks (user_id, title, category, status, due_date, xp_reward) VALUES (?, ?, ?, "pending", ?, ?)',
            [userId, title, category || 'general', due_date || null, xp_reward || 20]
        );
        res.status(201).json({ id: result.insertId, message: 'Task created!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;
        await pool.execute('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
        res.status(200).json({ message: 'Task deleted.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Schedules CRUD
exports.createSchedule = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description } = req.body;
        
        // Deactivate other schedules if needed (assuming one active schedule at a time for simplicity)
        await pool.execute('UPDATE schedules SET is_active = FALSE WHERE user_id = ?', [userId]);
        
        const [result] = await pool.execute(
            'INSERT INTO schedules (user_id, title, description, is_active) VALUES (?, ?, ?, TRUE)',
            [userId, title, description || '']
        );
        res.status(201).json({ id: result.insertId, message: 'Schedule created and activated!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const userId = req.user.id;
        const { scheduleId } = req.params;
        await pool.execute('DELETE FROM schedules WHERE id = ? AND user_id = ?', [scheduleId, userId]);
        res.status(200).json({ message: 'Schedule deleted.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addRoutineItem = async (req, res) => {
    try {
        const { scheduleId, title, time_start, time_end, icon } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO routine_items (schedule_id, title, time_start, time_end, icon, is_completed) VALUES (?, ?, ?, ?, ?, FALSE)',
            [scheduleId, title, time_start, time_end, icon || 'Clock']
        );
        res.status(201).json({ id: result.insertId, message: 'Routine item added!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Helper to handle XP logic and Level Up
async function rewardXP(userId, amount) {
    const [[user]] = await pool.execute('SELECT xp, max_xp, level FROM users WHERE id = ?', [userId]);
    if (!user) return;

    let { xp, max_xp, level } = user;
    xp += amount;

    while (xp >= max_xp) {
        xp -= max_xp;
        level += 1;
        max_xp = Math.floor(max_xp * 1.5);
    }

    await pool.execute(
        'UPDATE users SET xp = ?, max_xp = ?, level = ? WHERE id = ?',
        [xp, max_xp, level, userId]
    );
}
