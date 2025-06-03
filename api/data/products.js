// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Asegura que no haya dos productos con el mismo 'id' numérico
    },
    name: {
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // El precio no puede ser negativo
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // El stock no puede ser negativo
        default: 0 // Si no se especifica, por defecto es 0
    },
    category: {
        type: String,
        trim: true
    },
    subcategory: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);