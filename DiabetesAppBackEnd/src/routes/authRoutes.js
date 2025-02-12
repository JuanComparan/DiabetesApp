const express = require('express');
const authController = require('../controller/authController');
const { validateRegister, validateNewPassword, validateLogin, validateRecoverPassword, validateVerifyCode } = require('../middlewares/authValidator');

const router = express.Router();

router.post('/register', validateRegister, authController.register);

router.post('/login', validateLogin, authController.login);

router.post('/recover-password', validateRecoverPassword, authController.recoverPassword);

router.post('/verify-code', validateVerifyCode, authController.verifyCode);

router.post('/change-password', validateNewPassword, authController.changePassword);

router.post('/chat', authController.chatbot);

module.exports = router;