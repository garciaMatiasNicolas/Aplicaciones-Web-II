// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';
import Swal from 'sweetalert2';

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts().then(setProducts);
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        Swal.fire({
        icon: 'success',
        title: 'Agregado al carrito',
        text: product.name,
        timer: 1500,
        showConfirmButton: false,
        });
    };
    
    return (
        <div className="container mt-4">
        <h2 className="mb-4">Productos en venta</h2>
        <div className="row">
            {products.map(p => (
            <div key={p.id} className="col-md-3 mb-4">
                <div className="card h-100">
                <img src={p.image} className="card-img-top" alt={p.name} style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">Categoría: {p.category}</p>
                    <p className="card-text">Precio: ${p.price.toLocaleString()}</p>
                    </div>
                    <button className="btn btn-primary mt-auto" onClick={() => handleAddToCart(p)}>
                    Añadir al carrito
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

