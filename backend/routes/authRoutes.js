const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
//const authSchema = require("../validation/authSchema");
// const userRegister = require("../controllers/auth/userRegister");
// const userLogin = require("../controllers/auth/userLogin");

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);

// router.post("/register", userRegister);
// router.post("/login", userLogin);

module.exports = router;