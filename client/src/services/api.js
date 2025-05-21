// src/services/api.js
const API_URL = 'http://localhost:8000/api';

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  console.log(res)
  return res.json();
}

export const createOrder = async (userId, cartItems) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, items: cartItems }),
  });
  if (!res.ok) throw new Error('Error al crear orden');
  return res.json();
};

/* export const getProducts = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockProducts), 500); // simula demora de red
  });
}; */

