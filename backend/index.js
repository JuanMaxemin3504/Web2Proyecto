const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configura la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'donitas'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// API para obtener productos
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM donas UNION ALL SELECT * FROM cafes'; // Asegúrate que la tabla sea la correcta
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results);
  });
});

// Servidor corriendo en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
