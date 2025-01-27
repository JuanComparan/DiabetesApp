const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const emailValidator = require('../utils/emailValidator');

const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('El email no es válido.')
    .custom(emailValidator),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
], authController.register);

router.post('/login', authController.login);

module.exports = router;