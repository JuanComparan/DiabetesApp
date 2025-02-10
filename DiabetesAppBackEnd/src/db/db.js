const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa con la base de datos SQLite');
  }
});

// Crear la tabla de usuarios
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT, haveDiabetes INTEGER, iHaveDiabetes INTEGER, someoneHaveDiabetes INTEGER, verificationCode TEXT)');

module.exports = db;