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

exports.register = async (req, res) => {
  try {
    const { email, password, iHaveDiabetes, someoneHaveDiabetes } = req.body;

    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
        if (error) reject(error);
        resolve(row);
      })
    })

    if (user) {
      return res.status(400).json({ message: "El usuario ya existe. " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO users (email, password, iHaveDiabetes, someoneHaveDiabetes) VALUES (?, ?, ?, ?)');
      stmt.run(email, hashedPassword, iHaveDiabetes, someoneHaveDiabetes, function (err) {
        if (err) reject(err);
        resolve();
      });
    });

    console.log("Usuario registrado. ", email);
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error en register: ", error);
    res.status(500).json({ message: "Error interno del servidor. ", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
        if (error) reject(error);
        resolve(row);
      })
    })

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. " });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: "Credenciales incorrectas. " });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey', { expiresIn: '1h' });
      console.log("Usuario loggeado. ", email);
      res.status(200).json({ message: "Usuario loggeado con éxito. ", token });
    });
  } catch (error) {
    console.error("Error en login: ", error);
    res.status(500).json({ message: "Error interno del servidor. ", error: error.message });
  }
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
exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
        if (error) reject(error);
        resolve(row);
      })
    })

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. " });
    }

    const verificationCode = crypto.randomBytes(3).toString('hex');
    const hashedCode = await bcrypt.hash(verificationCode, 10);

    sendVerificationEmail(email, verificationCode)
      .then(() => {
        const stmt = db.prepare('UPDATE users SET verificationCode = ? where email = ?');
        stmt.run(hashedCode, email, function (err) {
          if (err) {
            return res.status(500).json({ message: 'Error al guardar el código de verificación.' });
          }
          console.log("Código enviado correctamente, ", email);
          res.status(200).json({ message: "Te hemos enviado un código de verificación a tu correo." });
        });
      })
      .catch(() => {
        res.status(500).json({ message: "Error al enviar el correo electrónico." });
      });

  } catch (error) {
    console.error("Error en recoverPassword: ", error);
    res.status(500).json({ message: "Error interno del servidor. ", error: error.message });
  }
};

//Paso 2: Verificar el codigo recibido
exports.verifyCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
        if (error) reject(error);
        resolve(row);
      })
    })

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. " });
    }

    bcrypt.compare(verificationCode, user.verificationCode, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: "Código de verificación incorrecto. " });
      }
      res.status(200).json({ message: "Código de verificación correcto. Ahora puedes cambiar tu contraseña. " });
    })
  } catch (error) {
    console.error("Error en verifyCode: ", error);
    res.status(500).json({ message: "Error interno del servidor. ", error: error.message });
  }
};

//Paso 3: Cambiar la contraseña
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const stmt = db.prepare('UPDATE users SET password = ?, verificationCode = NULL WHERE email = ?');
    stmt.run(hashedNewPassword, email, function (err) {
      if (err) {
        return res.status(500).json({ message: "Error al actualizar la contraseña. " });
      }
      console.log("Contraseña cambiada exitosamente, ", email);
      res.status(200).json({ message: "La contraseña fue cambiada con éxito. " });
    })
  } catch (error) {
    console.error("Error en changePassword: ", error);
    res.status(500).json({ message: "Error interno del servidor. ", error: error.message });
  }
};
