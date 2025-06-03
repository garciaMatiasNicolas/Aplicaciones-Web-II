const mongoose = require('mongoose');
const importData = require('./importData');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mngarcia:Riverplate09@cluster0.swaxwe9.mongodb.net/awebIIs?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error);
    process.exit(1);
  }
};

//importData(); Se llama una sola vez para cargar los datos a la base de datos

module.exports = connectDB;