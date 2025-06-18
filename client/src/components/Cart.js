// src/components/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { AuthModal } from './AuthModal';
import { useAuth } from '../context/AuthContext';
import { OrderDetailsModal } from './OrderDetailsModal';
const API_URL = 'http://localhost:8000/api';

export const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const { user, email, token } = useAuth();

    const handleConfirmPurchase = () => {
        if (!user) {
            setShowAuthModal(true);
        } else {
            setShowOrderDetails(true);
        }
    };

    const handleOrderDetailsConfirm = async (details) => {
        // Enviar orden al backend
        try {

        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
            },
            body: JSON.stringify({
                cart,
                email: email, // o el email que tengas en el contexto
                address: details.address,
                phone: details.phone,
            }),
        });

        const data = await res.json();
        console.log(data);
        if (res.ok) {
            Swal.fire('Éxito', 'Orden creada y enviada por email', 'success');
        } else {
            Swal.fire('Error', data.error || 'No se pudo crear la orden', 'error');
        }
        } catch (err) {
        Swal.fire('Error', 'Error de red', 'error');
        }
        setShowOrderDetails(false);
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
            <button className="btn btn-success" onClick={handleConfirmPurchase}>Finalizar compra</button>
            </div>
        )}
        <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <OrderDetailsModal
            show={showOrderDetails}
            onClose={() => setShowOrderDetails(false)}
            onConfirm={handleOrderDetailsConfirm}
        />
        </div>
    );
};
