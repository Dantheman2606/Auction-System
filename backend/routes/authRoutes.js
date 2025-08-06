const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware');
const updateProfile = require('../controllers/users/updateProfile');


router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/userinfo',authMiddleware,authController.userInfo);
router.put('/updateProfile', authMiddleware, updateProfile);


module.exports = router;