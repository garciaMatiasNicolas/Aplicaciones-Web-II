// src/pages/CheckoutPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export const CheckoutPage = () => {
  const { cart, clearCart } = useCart();

  const handleBuy = async () => {
    const userId = 1; // normalmente lo obtienes del login
    try {
      await createOrder(userId, cart);
      clearCart();
      alert('Orden generada exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al procesar la orden');
    }
  };

  return (
    <div>
      <h2>Resumen de compra</h2>
      <ul>
        {cart.map((item, idx) => <li key={idx}>{item.name}</li>)}
      </ul>
      <button onClick={handleBuy}>Comprar</button>
    </div>
  );
};
