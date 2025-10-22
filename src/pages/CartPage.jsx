import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';
import { getImageUrl } from '../utils/getImageUrl';
import { useCart } from '../context/CartContext';

const CartPage = () => {
const {carrito, eliminarDelCarrito} = useCart(); 
const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);

return (
<div className="cart-page-container">
<h1>🛒 Tu Carrito de Compras</h1>

{carrito.length === 0 ? (
<div className="cart-empty">
<p>Tu carrito está vacío.</p>
<Link to="/" className="btn-primary">Ver Catálogo</Link>
</div>
) : (

<div className="cart-content">
<div className="cart-items-list">
{carrito.map((producto, index) => (
<div key={`${producto.id}-${index}`} className="cart-item-card">

<img src={getImageUrl(producto)} alt={producto.album} className="cart-item-image" />
        
<div className="cart-item-details">
<h3>{producto.album}</h3>
<p>{producto.artista}</p>
<p className="cart-item-price">${producto.precio}</p>
</div>

<button onClick={() => eliminarDelCarrito(index)} className="cart-item-delete">
✖️
</button>
</div>
))}
</div>

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