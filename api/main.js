const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/users.js');
const productsRoutes = require('./routes/products.js');

app.use(cors({
  origin: 'http://localhost:3000', // origen que quieres permitir
  credentials: true, // si necesitas enviar cookies o headers personalizados
}));

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
