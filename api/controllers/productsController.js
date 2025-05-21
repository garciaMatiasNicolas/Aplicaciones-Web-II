const fs = require('fs');
const path = require('path');

const productsDataPath = path.join(__dirname, '../data/products.json');

// Obtener todos los productos
const getAllProducts = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsDataPath));
    res.json(products);
};

// Crear un nuevo producto
const createProduct = (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsDataPath));
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    fs.writeFileSync(productsDataPath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
};

// Buscar producto por nombre
const findProductByName = (req, res) => {
    const { name } = req.body;
    const products = JSON.parse(fs.readFileSync(productsDataPath));
    const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
};

// Actualizar un producto por ID
const updateProduct = (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productsDataPath));
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
    products[index] = { ...products[index], ...req.body };
    fs.writeFileSync(productsDataPath, JSON.stringify(products, null, 2));
    res.json(products[index]);
};

// Eliminar un producto por ID
const deleteProduct = (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productsDataPath));
    const newProducts = products.filter(p => p.id != id);
    fs.writeFileSync(productsDataPath, JSON.stringify(newProducts, null, 2));
    res.json({ message: 'Producto eliminado correctamente' });
};

module.exports = {
    getAllProducts,
    createProduct,
    findProductByName,
    updateProduct,
    deleteProduct,
};
