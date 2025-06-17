// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/api';
import Swal from 'sweetalert2';
import { ProductFilters } from './FilterProducts';

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products);
            setFilteredProducts(products);
        });
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

    const handleFilterChange = ({ category, priceRange }) => {
        let filtered = products;

        if (category !== 'Todos') {
        filtered = filtered.filter(p => p.category === category);
        }

        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        setFilteredProducts(filtered);
    };
    
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <ProductFilters products={products} onFilterChange={handleFilterChange} />
                </div>
                <div className="col-md-9">
                <h2 className="mb-4">Productos en venta</h2>
                <div className="row">
                    {filteredProducts.map(p => (
                    <div key={p.id} className="col-md-4 mb-4">
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
                    {filteredProducts.length === 0 && <p>No hay productos que coincidan con los filtros.</p>}
                </div>
                </div>
            </div>
        </div>
    );
};

