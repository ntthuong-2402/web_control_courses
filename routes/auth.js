const express = require('express');
const authController = require('../controller/auth')
const router = express.Router();

router.post('/register', authController.register);
router.post('/register_admin', authController.registerAdmin);
router.post('/login', authController.login);
// router.post('/login_admin', authController.loginAdmin);

module.exports = router;