// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css'; // Importo los nuevos estilos (sprint 5)
import { getImageUrl } from '../utils/getImageUrl';

// Recibir el 'carrito' y la nueva función 'eliminarDelCarrito' desde App.jsx
const CartPage = ({ carrito, eliminarDelCarrito }) => {
  
  // La misma lógica para calcular el total que ya tengo.
  const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);

  return (
    <div className="cart-page-container">
      <h1>🛒 Tu Carrito de Compras</h1>

      {/* Si el carrito está vacío, muestro un mensaje amigable */}
      {carrito.length === 0 ? (
        <div className="cart-empty">
          <p>Tu carrito está vacío.</p>
          <Link to="/" className="btn-primary">Ver Catálogo</Link>
        </div>
      ) : (
        // Si hay productos, los muestro en una lista
        <div className="cart-content">
          <div className="cart-items-list">
            {carrito.map((producto, index) => (
              <div key={`${producto.id}-${index}`} className="cart-item-card">

                {/* --- INICIO DEL CAMBIO --- */}
                {/* Usamos la función getImageUrl para obtener la ruta correcta */}
                <img src={getImageUrl(producto)} alt={producto.album} className="cart-item-image" />
                {/* --- FIN DEL CAMBIO --- */}

                <div className="cart-item-details">
                  <h3>{producto.album}</h3>
                  <p>{producto.artista}</p>
                  <p className="cart-item-price">${producto.precio}</p>
                </div>
                {/* Botón para eliminar el producto */}
                <button onClick={() => eliminarDelCarrito(index)} className="cart-item-delete">
                  ✖️
                </button>
              </div>
            ))}
          </div>

          {/* Resumen de la compra */}
          <div className="cart-summary">
            <h2>Resumen del Pedido</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <div className="summary-row">
              <span>Envío:</span>
              <span>Gratis</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <button className="btn-checkout">Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;