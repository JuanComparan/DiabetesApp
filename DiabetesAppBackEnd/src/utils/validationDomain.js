const allowedDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'alumnos.udg.mx'];

function isValidDomain(email) {
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
}

module.exports = (req, res, next) => {
  const { email } = req.body;
  if (!isValidDomain(email)) {
    return res.status(400).json({ message: 'El dominio del email no es permitido.' });
  }
  next();
};