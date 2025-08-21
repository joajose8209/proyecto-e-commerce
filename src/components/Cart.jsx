import React from 'react';
const Cart = ({carrito}) => {
return (
<div>
 <h2>Carrito de Compras</h2>
 {carrito.length === 0 ? (
    <p>No hay productos en el carrito</p>) : (
  carrito.map(producto => (  
    <div key={producto.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <img src={`/img/${producto.imagen}`} alt={producto.album} style={{ width: '100px', height: 'auto' }} />
      <p>{producto.album}</p>
      <p>Artista: {producto.artista}</p>
      <p>Precio: ${producto.precio}</p>
    </div>
  ))
  )}   
</div>    
) ;   
};
export default Cart;