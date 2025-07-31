const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

const authMiddleware = require('../middleware/authMiddleware');


router.get('/getProfile/:id', authMiddleware, userController.getProfile);

module.exports = router;