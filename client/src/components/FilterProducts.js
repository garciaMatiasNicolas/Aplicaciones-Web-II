import { useState, useEffect } from 'react';

export const ProductFilters = ({ products, onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState([0, 0]);

  // Calcular precios mínimo y máximo al cargar productos
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange([min, max]);
    }
  }, [products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, priceRange });
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
    onFilterChange({ category: selectedCategory, priceRange: newRange });
  };

  const uniqueCategories = ['Todos', ...new Set(products.map(p => p.category))];

  return (
    <div className="border p-3 rounded shadow-sm mb-4">
      <h5>Filtrar productos</h5>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">Precio mínimo: ${priceRange[0]}</label>
        <input type="range" min="0" max={priceRange[1]} value={priceRange[0]} onChange={e => handlePriceChange(e, 0)} className="form-range" />

        <label className="form-label">Precio máximo: ${priceRange[1]}</label>
        <input type="range" min={priceRange[0]} max="1000000" value={priceRange[1]} onChange={e => handlePriceChange(e, 1)} className="form-range" />
      </div>
    </div>
  );
};
