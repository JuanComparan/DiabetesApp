const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const validateDomain = require('../utils/validationDomain');

const router = express.Router();

router.post('/register', [
  body('email')
    .isEmail().withMessage('El email no es válido.')
    .custom(value => {
      // Comprobar si el email tiene un espacio al principio usando una expresión regular
      if (/^\s/.test(value)) {
        throw new Error('El email no puede tener un espacio al inicio.');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
    .custom(value => {
      // Comprobar la ocntraseña tiene un espacio al principio usando una expresión regular
      if (/^\s/.test(value)) {
        throw new Error('La contraseña no puede tener un espacio al inicio.');
      }
      return true;
    }),
], validateDomain, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(err => err.msg) });
  }
  authController.register(req, res);
});

router.post('/login', authController.login);

router.post('/chat', authController.chatbot);

router.post('/recover-password', authController.recoverPassword);

router.post('/verify-code', authController.verifyCode);

router.post('/change-password', authController.changePassword);

module.exports = router;