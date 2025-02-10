const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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
      return res.status(500).json({ message: 'Hubo un error al realizar la consulta.' });
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

// Funcion para enviar codigo de verificación
const sendVerificationEmail = (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: '"DiabetesAppSoporteTecnico" <process.env.EMAIL_USER>',
    to: email,
    subject: 'Código de verificación para recuperar contraseña',
    text: `Tu código de verificación es: ${verificationCode}`
  };

  return transporter.sendMail(mailOptions);
};

//Paso 1: Verficiar el email y generar un codigo de verificación.
exports.recoverPassword = (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: "El correo electronico es obligatorio." });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Hubo un error al realizar la consulta.' });
    }
    if (!user) {
      return res.status(404).json({ message: 'El correo electronico no existe.' });
    }

    //Generar un codigo de verificacion
    const verificationCode = crypto.randomBytes(3).toString('hex'); // 6 caracteres al azar

    //Enviar el código al correo
    sendVerificationEmail(email, verificationCode)
      .then(() => {
        const stmt = db.prepare('UPDATE users SET verificationCode = ? where email = ?');
        stmt.run(verificationCode, email, function (err) {
          if (err) {
            return res.status(500).json({ message: 'Error al guardar el código de verificación.' });
          }
          res.json({ message: "Te hemos enviado un código de verificación a tu correo." });
        });
      })
      .catch(() => {
        res.status(500).json({ message: "Error al enviar el correo electrónico." });
      });
  });
};

//Paso 2: Verificar el codigo recibido
exports.verifyCode = (req, res) => {
  const { email, verificationCode } = req.body;

  if (!verificationCode) {
    return res.status(400).json({ message: "El código de verificación es obligatorio." });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar el correo electronico." });
    }
    if (!user) {
      return res.status(500).json({ message: "El correo electronico no existe." });
    }

    if (user.verificationCode === verificationCode) {
      res.json({ message: "Código de verifcación correcto. Ahora puedes cambiar tu contraseña." });
    } else {
      console.log("Codigo de verificacion almacenado: ", user.verificationCode);
      console.log("Codigo de verificacion recibido: ", verificationCode);
      res.status(400).json({ message: "Código de verificación incorrecto." });
    }
  });
};

//Paso 3: Cambiar la contraseña
exports.changePassword = (req, res) => {
  const { email, newPassword } = req.body;

  if (!newPassword) {
    return res.status(500).json({ message: "La nueva contraseña es obligatoria." });
  }

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error al encriptar la nueva contraseña." });
    }

    //Actualizar la contraseña en la base de datos
    const stmt = db.prepare('UPDATE users SET password = ?, verificationCode = NULL WHERE email = ?');
    stmt.run(hashedPassword, email, function (err) {
      if (err) {
        return res.status(500).json({message: "Error al actualizar la contraseña."});
      }
      res.json({message: "Contraseña cambiada con éxito!"});
    });
  });
};
