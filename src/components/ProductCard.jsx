import React from "react";
import { Link } from "react-router-dom";  
//Componente que muestra info de un solo producto, tarjeta visual que muestra los datos del vinilo, plantilla.
const ProductCard = ({ producto, agregarAlCarrito }) => {
const detailUrl = `/vinilo/${producto.id}`;

// Corrijo el return para que devuelva un solo elemento raíz.
//  // El <Link> debe envolver todo el contenido de la tarjeta.
 return (
 <Link to={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
{/* Puse todo el div de la tarjeta aquí adentro del Link. */}
 <div style= {{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '200px' }}>
 <img src={`/img/${producto.imagen}`} alt={producto.album} style={{ width: '100%', height: 'auto' }} />
 <h3>{producto.album}</h3>
 <p>Artista: {producto.artista}</p>
 <p>Precio: ${producto.precio}</p>
 <p>Genero: {producto.genero}</p>
 {/* Aqui se agrega un comentario para el boton de agregar al carrito */}   
  <button onClick={(e)=> {
 e.preventDefault(); 
 agregarAlCarrito(producto)
 }}>
Agregar al Carrito
 </button>
 </div>
 </Link>
 );
};

export default ProductCard;