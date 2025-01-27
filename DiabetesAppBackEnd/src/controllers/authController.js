const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

exports.register = (req, res) => {
  const { email, password, iHaveDiabetes, someoneHaveDiabetes } = req.body;

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
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

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