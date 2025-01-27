const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const db = require('../db/db');
const emailValidator = require('../utils/emailValidator');

// Función de registro
exports.register = (req, res) => {
  const message = validationResult(req);
  if (!message.isEmpty()) {
    const errorMessages = message.array().map(error => error.msg);
    return res.status(400).json({ message: errorMessages });
  }

  const { email, password, iHaveDiabetes, someoneHaveDiabetes } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'El email y la contraseña son obligatorios.' });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
    if (error) {
      return res.status(500).json({ message: 'Error al verificar el email.' });
    }

    if (row) {
      return res.status(400).json({ message: 'El email ya existe.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error al encriptar la contraseña' });
      }

      const stmt = db.prepare('INSERT INTO users (email, password, iHaveDiabetes, someoneHaveDiabetes) VALUES (?, ?, ?, ?)');
      stmt.run(email, hashedPassword, iHaveDiabetes, someoneHaveDiabetes, function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  })
};

// Función de login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });
      res.json({ message: 'Login exitoso', token });
    });
  });
};