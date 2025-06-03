
const Product = require('../data/products'); 

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body); 
        const savedProduct = await newProduct.save(); 
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(400).json({ error: error.message });
    }
};

const findProductByName = async (req, res) => {
    try {
        const { name } = req.body;
        const product = await Product.findOne({ name: { $regex: new RegExp(name, 'i') } });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el producto por nombre:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(400).json({ error: error.message }); 
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (deletedProduct) {
            res.json({ message: 'Producto eliminado correctamente', deletedProduct });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = {
    getAllProducts,
    createProduct,
    findProductByName,
    updateProduct,
    deleteProduct,
};