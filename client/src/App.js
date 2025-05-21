// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductList } from './components/ProductList';
import { FilterPage } from './components/FilterPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Cart } from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Mi Tienda</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/filtrar">Filtrar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">Carrito</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/checkout">Checkout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/filtrar" element={<FilterPage />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
