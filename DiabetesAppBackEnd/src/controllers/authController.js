const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Importación dinámica
require("dotenv").config();

exports.chatbot = async (req, res) => {
  try {
    const { user_id, message } = req.body;

    if (!user_id || !message) {
      return res.status(400).json({ message: "Faltan datos en la petición." })
    }

    const response = await fetch(
      "https://api.stack-ai.com/inference/v0/run/9d9c9438-1535-493b-b0cd-448882163957/67a531abda8040b6e33dbc0f",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.STACK_AI_API_KEY}`, // Usar variable de entorno
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          "in-0": message
        })
      }
    );

    if (!response.ok) {
      return res.status(500).json({ message: "Error de la API del chatbot." });
    }

    const data = await response.json();
    res.json(data); // Devolver al front end
  } catch {
    console.error("Error del chatbor: ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}


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
        console.log("Usuario registrado, email: ", email);
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(400).json({ message: 'Hubo un error al realizar la consulta.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'El correo electronico no existe.' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });
      console.log("Login exitoso, email: ", email);
      res.json({ message: 'Login exitoso', token });
    });
  });
};