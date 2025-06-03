const fs = require('fs');
const User = require('./user'); // Importa tu modelo de usuario
const Product = require('./products'); // Importa tu modelo de producto


const importData = async () => {

    try {
        // Leer los archivos JSON
        const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
        const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, 'utf-8'));

        // Opcional: Limpiar las colecciones existentes antes de insertar
        console.log('Borrando datos existentes...');
        await User.deleteMany();
        await Product.deleteMany();
        console.log('Datos existentes borrados.');

        // Insertar los nuevos datos
        console.log('Insertando nuevos usuarios...');
        await User.insertMany(users);
        console.log('Usuarios insertados correctamente.');

        console.log('Insertando nuevos productos...');
        await Product.insertMany(products);
        console.log('Productos insertados correctamente.');

        console.log('Datos cargados exitosamente.');
        process.exit(); // Finaliza el proceso
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        process.exit(1);
    }
};

module.exports = importData;