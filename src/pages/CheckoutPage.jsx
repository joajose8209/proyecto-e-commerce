import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutPage.css';

const estadoInicialForm = {
nombre: '',
email: '',
telefono: '',
direccion: ''
};

const leerEstadoInicial = () => {
const datosGuardados = localStorage.getItem('checkoutForm');
if (datosGuardados) {
return JSON.parse(datosGuardados);
}
return estadoInicialForm;
};

const generarMensajeWhatsApp = (orden) => {
const itemsMensaje = orden.items.map(prod=>
`-${prod.album} (${prod.artista}) : $${prod.precio}`  
).join('\n');  

const MensajeFinal = `
¡ Nuevo Pedido! 🛒

*Cliente:* ${orden.comprador.nombre}
*Email:* ${orden.comprador.email}
*Telefono:* ${orden.comprador.telefono}
*Direccion:* ${orden.comprador.direccion}

*Resumen Pedido:*
${itemsMensaje}

*TOTAL: $${orden.total}*
`;

const mensajeCodificado = encodeURIComponent(MensajeFinal);

const tuNumeroWhatsApp = '5493816385762'

return `https://api.whatsapp.com/send?phone=${tuNumeroWhatsApp}&text=${mensajeCodificado}`;

};

function CheckoutPage() {
  
const [formData, setFormData] = useState(leerEstadoInicial);
const [errores, setErrores] = useState({});

const [ordenCompleta, setOrdenCompleta] = useState(null);

const [ordenId, setOrdenId] = useState(null); 
const { carrito, limpiarCarrito } = useCart(); 


useEffect(() => {
localStorage.setItem('checkoutForm', JSON.stringify(formData));
}, [formData]); 

const totalCalculado = carrito.reduce((acumulador, producto) => {
return acumulador + producto.precio;
}, 0); 

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prevData) => ({
...prevData,
[name]: value
}));
};

const manejarEnvio = (e) => {
e.preventDefault();
const nuevosErrores = {};

if(!formData.nombre.trim()) {
nuevosErrores.nombre  = 'El nombre es obligatorio';
}
if (!formData.email.trim()) {
nuevosErrores.email = 'El email es obligatorio';
}
if (!formData.telefono.trim()) {
nuevosErrores.telefono = 'El teléfono es obligatorio';
}
if (!formData.direccion.trim()) {
nuevosErrores.direccion = 'La dirección es obligatoria';
}

if (Object.keys(nuevosErrores).length > 0) {
setErrores(nuevosErrores);
} else {

setErrores({});

const ordenDeCompra = {
comprador: formData,
items: carrito,
total: totalCalculado,
fecha: new Date()
};
      
const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes')) || [];

ordenesGuardadas.push(ordenDeCompra);

localStorage.setItem('ordenes', JSON.stringify(ordenesGuardadas));

limpiarCarrito();
localStorage.removeItem('checkoutForm');
setFormData(estadoInicialForm);

setOrdenCompleta(ordenDeCompra);
}
};


  
if (ordenCompleta) {

const enlaceWhatsApp = generarMensajeWhatsApp(ordenCompleta);  
return (
    
<div className="checkout-container">
<div className="success-message">
<h2>¡Gracias por tu compra, {ordenCompleta.comprador.nombre}!!</h2>
<p>Tu orden ha sido procesada en nuestro sistema..</p>
<p>Para finalizar, por favor envía tu pedido a nuestro WhatsApp para que podamos coordinar el pago y el envío.</p>
<a 
href={enlaceWhatsApp} 
target="_blank" 
rel="noopener noreferrer" 
className="btn-primary"
>
Enviar Pedido por WhatsApp
</a>
<Link to="/" className="back-to-cart-btn" style={{marginLeft: '20px'}}>
Volver al Inicio
</Link>
</div>
</div>
);
}

return (
<div className="checkout-container">
<h2>Finalizar Compra</h2>
          
<Link to="/carrito" className="back-to-cart-btn">
&larr; Volver al Carrito
</Link>

<div className="checkout-layout">
            
<form className="checkout-form" onSubmit={manejarEnvio}>
<h3>Datos de Contacto y Envío</h3> 
      
<div className="form-group">
<label htmlFor="nombre">Nombre: </label>
<input 
type="text" 
id="nombre"
name="nombre" 
value={formData.nombre} 
onChange={handleChange}
className="form-input"
/>
{errores.nombre && <small className="error-text">{errores.nombre}</small>}
</div>
  
<div className="form-group">
<label htmlFor="email">Email: </label>
<input 
 type="email" 
 id="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 className="form-input"
 />
{errores.email && <small className="error-text">{errores.email}</small>}
</div>

<div className="form-group">
<label htmlFor="telefono">Teléfono: </label>
<input 
type="tel" 
id="telefono"
name="telefono"
value={formData.telefono}
onChange={handleChange}
className="form-input"
/>
{errores.telefono && <small className="error-text">{errores.telefono}</small>}
</div>
          
<div className="form-group">
<label htmlFor="direccion">Dirección: </label>
<input 
type="text" 
id="direccion"
name="direccion"
value={formData.direccion} 
onChange={handleChange}
className="form-input"
/>
{errores.direccion && <small className="error-text">{errores.direccion}</small>}
</div>
          
<button type="submit" className="submit-btn">
Generar Orden
</button>
</form>
            
<div className="resumen-compra">
<h3>Resumen de tu Compra</h3>
                      
{carrito.length === 0 ? (
<p>No hay productos en tu carrito.</p>
) : (
carrito.map((producto, index) => (
<div key={`${producto.id}-${index}`} className="resumen-item">
<span>{producto.album}</span>
<strong>${producto.precio}</strong>
</div>
))
)}

{carrito.length > 0 && (
<>
<hr />
<div className="resumen-total">
<strong>Total: </strong>
<strong>${totalCalculado}</strong>
</div>
</>
)}
</div>

</div> 
</div>
);
}

export default CheckoutPage;