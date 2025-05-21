// src/components/FilterPage.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

export const FilterPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = filter ? products.filter(p => p.category === filter) : products;

  return (
    <div>
      <h2>Filtrar por categoría</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value=''>Todas</option>
        <option value='ropa'>Ropa</option>
        <option value='electronica'>Electrónica</option>
        <option value='hogar'>Hogar</option>
      </select>

      <ul>
        {filtered.map(p => (
          <li key={p.id}>{p.name} - {p.category}</li>
        ))}
      </ul>
    </div>
  );
};
