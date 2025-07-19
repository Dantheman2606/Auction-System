const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/userinfo',authMiddleware,authController.userInfo);


module.exports = router;