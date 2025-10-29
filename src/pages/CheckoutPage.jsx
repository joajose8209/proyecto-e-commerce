import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';

function CheckoutPage() {
const [formData, setFormData] = useState({
nombre: '',
email: '',
telefono: '',
direccion: ''
  });

const {carrito, total} = useCart();  

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prevData) => ({
...prevData,
[name]: value
}));
};

return (
<div className="checkout-container">
<h2>Finalizar Compra</h2>

<Link to="/carrito" className='back-to-cart-btn' >
&larr; Volver al Carrito
</Link>

<div className="checkout-layout">

<form className="checkout-form">
<h3>Datos de Contacto</h3>        
<div className="form-group">
<label htmlFor="nombre">Nombre: </label>
<input 
type="text" 
id="nombre"
name="nombre" 
value={formData.nombre} 
onChange={handleChange}
/>
</div>

<div className="form-group">
<label htmlFor="email">Email: </label>
<input 
type="email" 
id="email"
name="email"
value={formData.email}
onChange={handleChange}
/>
</div>

<div className="form-group">
<label htmlFor="telefono">Teléfono: </label>
<input 
type="tel" 
id="telefono"
name="telefono"
value={formData.telefono}
onChange={handleChange}          
/>
</div>

<div className="form-group">
<label htmlFor="direccion">Dirección: </label>
<input 
type="text" 
id="direccion"
name="direccion"
value={formData.direccion}
onChange={handleChange}
/>
</div>

<button type="submit" className="submit-order-btn">
Generar Orden
</button>
</form>

<div className="resumen-compra">
<h3>Resumen de tu Compra</h3>

{carrito.map((producto) => (
<div key={producto.id} className="resumen-item">
<span>{producto.album} (x{producto.cantidad})</span>
<span>${producto.precio * producto.cantidad}</span>
</div>
))}

<div className="resumen-total">
<strong>Total:</strong>
<strong>${total}</strong>
</div>
</div>
</div>
</div>
);
}

export default CheckoutPage;