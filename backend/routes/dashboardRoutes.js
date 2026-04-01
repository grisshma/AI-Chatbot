const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming this exists for user auth

// All dashboard routes are protected
router.use(authMiddleware);

router.get('/', dashboardController.getDashboardData);
router.post('/habit/complete/:habitId', dashboardController.completeHabit);
router.post('/task/complete/:taskId', dashboardController.completeTask);
router.post('/update-mode', dashboardController.updateMode);
router.post('/routine-item/complete/:itemId', dashboardController.completeRoutineItem);

// Habits
router.post('/habit', dashboardController.createHabit);
router.delete('/habit/:habitId', dashboardController.deleteHabit);

// Tasks
router.post('/task', dashboardController.createTask);
router.delete('/task/:taskId', dashboardController.deleteTask);

// Schedules
router.post('/schedule', dashboardController.createSchedule);
router.delete('/schedule/:scheduleId', dashboardController.deleteSchedule);
router.post('/routine-item', dashboardController.addRoutineItem);

module.exports = router;
