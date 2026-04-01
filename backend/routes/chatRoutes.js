const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect these routes
router.use(authMiddleware);

router.post('/', chatController.chat);
router.get('/history/:userId', chatController.getHistory);

module.exports = router;
