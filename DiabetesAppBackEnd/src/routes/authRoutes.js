const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const validateDomain = require('../utils/validationDomain');

const router = express.Router();

router.post('/register', [
  body('email').isEmail().withMessage('El email no es válido.'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
], validateDomain, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(err => err.msg) });
  }
  authController.register(req, res);
});

router.post('/login', authController.login);

router.post('/chat', authController.chatbot);

module.exports = router;