// src/components/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { createOrder } from '../services/api';
import { AuthModal } from './AuthModal';
import { useAuth } from '../context/AuthContext';

export const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, token } = useAuth();

    const handleBuy = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (cart.length === 0) {
            Swal.fire('Carrito vacío', 'Agregá productos antes de comprar', 'warning');
            return;
        }

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId: user._id,
                products: cart
            })
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Orden creada',
                text: `Tu orden #${data.orderId || 'desconocida'} fue creada exitosamente.`,
            });
            clearCart();
        } else {
            Swal.fire('Error', data.error || 'No se pudo procesar la orden', 'error');
        }
    };


    const handleRemove = (id) => {
        removeFromCart(id);
        Swal.fire({
            icon: 'info',
            title: 'Producto eliminado del carrito',
            timer: 1500,
            showConfirmButton: false,
        });
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
                            <p className="card-text">Precio unitario: ${item.price.toLocaleString()}</p>
                            <p className="card-text">Cantidad: {item.quantity}</p>
                            <p className="card-text">Subtotal: ${(item.price * item.quantity).toLocaleString()}</p>
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                                Eliminar unidad
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
        <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />

        </div>
    );
};
