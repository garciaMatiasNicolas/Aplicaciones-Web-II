const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/users.js');
const productsRoutes = require('./routes/products.js');
const ordersRouter = require('./routes/orders.js');
const connectDB = require('./data/db');
require('dotenv').config();

connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

