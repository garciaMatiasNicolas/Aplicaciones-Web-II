// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { createOrder } from '../services/api';

export const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleRemove = (id) => {
        removeFromCart(id);
        Swal.fire({
        icon: 'info',
        title: 'Producto eliminado del carrito',
        timer: 1500,
        showConfirmButton: false,
        });
    };

    const handleBuy = async () => {
        if (cart.length === 0) {
        Swal.fire('Carrito vacío', 'Agregá productos antes de comprar', 'warning');
        return;
        }

        const result = await createOrder('usuario_123', cart);

        if (result.success) {
        Swal.fire({
            icon: 'success',
            title: 'Orden creada',
            text: `Tu orden #${result.orderId} fue creada exitosamente.`,
        });
        clearCart();
        }
    };

    return (
        <div className="container mt-4">
        <h2>Carrito de compras</h2>
        {cart.length === 0 ? (
            <div className="alert alert-info">No hay productos en el carrito</div>
        ) : (
            <div className="row">
            {cart.map(item => (
                <div className="col-md-4 mb-3" key={item.id}>
                <div className="card">
                    <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '180px', objectFit: 'cover' }} />
                    <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Precio: ${item.price.toLocaleString()}</p>
                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                        Eliminar
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}

        {cart.length > 0 && (
            <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Total: ${total.toLocaleString()}</h4>
            <button className="btn btn-success" onClick={handleBuy}>Finalizar compra</button>
            </div>
        )}
        </div>
    );
};
