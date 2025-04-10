const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
<<<<<<< Updated upstream
const db = require("../db/db");
=======
const supabase = require("../db/db");
>>>>>>> Stashed changes
require("dotenv").config();

const FetchUsers = async (email) => {
  let usuarios = [];
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  if (error) {
    console.log("Error", error);
    return error;
  }

  if (data) {
    usuarios = data;
  }

  return usuarios;
};

// Funcion para registrarse
exports.register = async (req, res) => {
  try {
    const { email, password, iHaveDiabetes, someoneHaveDiabetes } = req.body;

<<<<<<< Updated upstream
    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (error, row) => {
        if (error) reject(error);
        resolve(row);
      });
    });
=======
    const [user] = await FetchUsers(email);
>>>>>>> Stashed changes

    if (user) {
      return res.status(400).json({ message: "El usuario ya existe. " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      email: email,
      password: hashedPassword,
      iHaveDiabetes: iHaveDiabetes,
      someoneHaveDiabetes: someoneHaveDiabetes,
    });

    if (error) {
      console.log(error);
    }

    console.log("Usuario registrado. ", email);
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error en register: ", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor. ", error: error.message });
  }
};

// Funcion para inicicar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await FetchUsers(email);

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. " });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: "Credenciales incorrectas. " });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, "secretKey", {
        expiresIn: "1h",
      });
      console.log("Usuario loggeado. ", email);
      res.status(200).json({ message: "Usuario loggeado con éxito. ", token });
    });
  } catch (error) {
    console.error("Error en login: ", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor. ", error: error.message });
  }
};

// Funcion para enviar codigo de verificación
const sendVerificationEmail = (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"DiabetesAppSoporteTecnico" <process.env.EMAIL_USER>',
    to: email,
    subject: "Código de verificación para recuperar contraseña",
    text: `Tu código de verificación es: ${verificationCode}`,
  };

  return transporter.sendMail(mailOptions);
};

//Paso 1: Verficiar el email y generar un codigo de verificación.
exports.recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await FetchUsers(email);

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. " });
    }

    const verificationCode = crypto.randomBytes(3).toString("hex");
    const hashedCode = await bcrypt.hash(verificationCode, 10);

<<<<<<< Updated upstream
    sendVerificationEmail(email, verificationCode)
      .then(() => {
        const stmt = db.prepare(
          "UPDATE users SET verificationCode = ? where email = ?"
        );
        stmt.run(hashedCode, email, function (err) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al guardar el código de verificación." });
          }
          console.log("Código enviado correctamente, ", email);
          res
            .status(200)
            .json({
              message:
                "Te hemos enviado un código de verificación a tu correo.",
            });
        });
      })
      .catch(() => {
        res
=======
    try {
      sendVerificationEmail(email, verificationCode);

      const { error } = await supabase
        .from("users")
        .update({ verificationCode: hashedCode })
        .eq("email", email);

      if (error) {
        return res
>>>>>>> Stashed changes
          .status(500)
          .json({ message: "Error al guardar el código de verificación." });
      }

      console.log("Código enviado correctamente, ", email);
      return res.status(200).json({
        message: "Te hemos enviado un código de verificación a tu correo.",
      });
    } catch {
      return res
        .status(500)
        .json({ message: "Error al enviar el correo electrónico." });
    }
  } catch (error) {
    console.error("Error en recoverPassword: ", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor. ", error: error.message });
  }
};

//Paso 2: Verificar el codigo recibido
exports.verifyCode = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    const [user] = await FetchUsers(email);

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. " });
    }

    bcrypt.compare(verificationCode, user.verificationCode, (err, result) => {
      if (err || !result) {
        return res
          .status(400)
          .json({ message: "Código de verificación incorrecto. " });
      }
      res
        .status(200)
        .json({
          message:
            "Código de verificación correcto. Ahora puedes cambiar tu contraseña. ",
        });
    });
  } catch (error) {
    console.error("Error en verifyCode: ", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor. ", error: error.message });
  }
};

//Paso 3: Cambiar la contraseña
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const { error } = await supabase
      .from("users")
      .update({ password: hashedNewPassword })
      .eq("email", email);

    if (error) {
      return res
        .status(500)
        .json({ message: "Error al actualizar la contraseña. " });
    }

    console.log("Contraseña cambiada exitosamente, ", email);
    res.status(200).json({ message: "La contraseña fue cambiada con éxito. " });
  } catch (error) {
    console.error("Error en changePassword: ", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor. ", error: error.message });
  }
};
