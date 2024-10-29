const express = require('express');
const stripe = require('stripe')('sk_test_51QF6JIHFF8h6a0zJcq2PvtoaNKtQ9F5snsD4yM9lL5dqKT71LYk6LxtL3A6FLJbkyLo9uVVGTBsugFg20H0QBx1u00p8mlNiAO');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Usa express.json() en lugar de bodyParser.json()

// Configuración de MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'donitas',
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Endpoint para obtener productos
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM donas UNION ALL SELECT * FROM cafes'; // Asegúrate de que esta consulta sea correcta
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results);
  });
});

// Endpoint para el cargo con Stripe
app.post('/charge', async (req, res) => {
  const { token } = req.body;

  if (!token || !token.id) {
    return res.status(400).send('Token de pago inválido');
  }

  try {
    const charge = await stripe.charges.create({
      amount: 5000, // Monto en centavos
      currency: 'usd',
      source: token.id,
      description: 'Prueba de pago',
    });
    res.status(200).send(charge);
  } catch (error) {
    console.error('Error en el proceso de pago:', error);
    res.status(500).send({
      error: error.message || 'Error al procesar el pago',
    });
  }
});

// Iniciar servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
