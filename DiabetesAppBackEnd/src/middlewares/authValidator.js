const { body, validationResult } = require('express-validator');

const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'alumnos.udg.mx'];

function isValidDomain(email) {
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

exports.validateRegister = [
    body('email')
        .notEmpty().withMessage('El correo electronico es obligatorio. ')
        .isEmail().withMessage('El correo electronico no es válido. ')
        .custom(value => {
            // Comprobar si el email tiene un espacio al principio usando una expresión regular
            if (/^\s/.test(value)) {
                throw new Error('El correo electronico no puede tener un espacio al inicio. ');
            }
            if (!isValidDomain(value)) {
                throw new Error('El dominio del correo electronico no es permitido. ')
            }
            return true;
        }),
    body('password')
        .notEmpty().withMessage("La contraseña es obligatoria. ")
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres. ')
        .custom(value => {
            // Comprobar la ocntraseña tiene un espacio al principio usando una expresión regular
            if (/^\s/.test(value)) {
                throw new Error('La contraseña no puede tener un espacio al inicio. ');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(err => err.msg) });
        }
        next();
    }
];

exports.validateLogin = [
    body('email')
        .notEmpty().withMessage("El correo electronico es obligatorio. ")
        .isEmail().withMessage('El correo electronico no es válido. '),
    body('password')
        .notEmpty().withMessage("La contraseña es obligatoria. "),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(err => err.msg) });
        }
        next();
    }
]

exports.validateRecoverPassword = [
    body('email')
        .notEmpty().withMessage("El correo electronico es obligatorio. ")
        .isEmail().withMessage('El correo electronico no es válido. '),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(err => err.msg) });
        }
        next();
    }
]

exports.validateVerifyCode = [
    body('verificationCode')
        .notEmpty().withMessage("El código de verificación es obligatorio. "),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(err => err.msg) });
        }
        next();
    }
]

exports.validateNewPassword = [
    body('newPassword')
        .notEmpty().withMessage("La contraseña es obligatoria. ")
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres. ')
        .custom(value => {
            // Comprobar la ocntraseña tiene un espacio al principio usando una expresión regular
            if (/^\s/.test(value)) {
                throw new Error('La contraseña no puede tener un espacio al inicio. ');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(err => err.msg) });
        }
        next();
    }
];