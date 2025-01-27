const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

// Inicializar la aplicación Express
const app = express();
const port = 3000;

app.use(cors());

// Configurar Express para parsear JSON
app.use(express.json());

// Conexión con la base de datos SQLite
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa con la base de datos SQLite');
  }
});

// Crear la tabla de usuarios (si no existe)
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT, haveDiabetes INTEGER, iHaveDiabetes INTEGER, someoneHaveDiabetes INTEGER)');

// Lista de dominios permitidos
const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];

// Función para verificar el dominio
function isValidDomain(email) {
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
}

// Ruta de registro de usuario
app.post('/register', [
  body('email')
    .isEmail().withMessage('El email no es válido.')
    .custom((value) => {
      if (!isValidDomain(value)) {
        throw new Error('El dominio del email no es permitido.')
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
    .matches(/^\S/).withMessage('La contraseña no debe empezar con espacio.')
], (req, res) => {

  const message = validationResult(req);

  if (!message.isEmpty()) {
    // Filtrar los errores y devolver solo los mensajes
    const errorMessages = message.array().map(error => error.msg);

    // Devolver los mensajes de error
    return res.status(400).json({ message: errorMessages });
  }

  const { email, password, iHaveDiabetes, someoneHaveDiabetes } = req.body;

  // Verificar que los datos sean correctos
  if (!email || !password) {
    return res.status(400).json({ message: 'El email y la contraseña son obligatorios.' });
  }

  // Verificar que el email no exista
  db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
    if (error) {
      return res.status(500).json({ message: 'Error al verificar el email.' });
    }

    if (row) {
      return res.status(400).json({ message: 'El email ya existe.' });
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error al encriptar la contraseña' });
      }

      // Insertar el nuevo usuario en la base de datos
      const stmt = db.prepare('INSERT INTO users (email, password, iHaveDiabetes, someoneHaveDiabetes) VALUES (?, ?, ?, ?)');
      stmt.run(email, hashedPassword, iHaveDiabetes, someoneHaveDiabetes, function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
        console.log("Email: ", email);
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  })

});

// Ruta de login de usuario
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  // Verificar si el usuario existe
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña ingresada con la encriptada
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }

      // Generar un JWT
      const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });
      res.json({ message: 'Login exitoso', token });
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
