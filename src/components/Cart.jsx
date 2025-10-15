import React from 'react';

const Cart = ({ carrito }) => {

const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);

return (
<aside style={{
border: '1px solid black',
padding: '16px',
position: 'fixed',
right: '20px',
bottom: '20px',
width: '300px',
backgroundColor: 'white',
borderRadius: '8px'
}}>
<h2>Carrito de Compras 🛒</h2>
{carrito.length === 0 ? (
<p>El carrito está vacío.</p>
) : (
<ul>
{carrito.map((producto, index) => (
<li key={`${producto.id}-${index}`} style={{ marginBottom: '10px' }}>
{producto.album} - ${producto.precio}
</li>
))}
</ul>
)}
{carrito.length > 0 && (
<>
<hr />
<h4>Total: ${total}</h4>
</>
)}
</aside>
);
};

export default Cart;