import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetailPage.css';
import { useCart } from '../context/CartContext';

function ProductDetailPage({ productos}) {
const { id } = useParams();
const [producto, setProducto] = useState(null);
const [loading, setLoading] = useState(true);
const [relacionados, setRelacionados] = useState([]);
const {agregarAlCarrito} = useCart();

  
useEffect(() => {
if (productos.length > 0) {
setLoading(true);
const productoEncontrado = productos.find((p) => p.id == id);
setProducto(productoEncontrado);
setLoading(false);
}
}, [id, productos]);

useEffect(() => {
if (producto && productos.length > 0) {
const productosFiltrados = productos.filter(p => p.genero === producto.genero && p.id !== producto.id);
setRelacionados(productosFiltrados.slice(0, 4,));
};
}, [producto, productos]);

if (loading) {
return <p>Cargando producto...</p>;
}

if (!producto) {
return <p>Producto no encontrado.</p>;
}
const imageUrl = producto.imagen.startsWith('http') 
? producto.imagen          
: `/img/${producto.imagen}`; 

return (
<div className="detalle-container">
<div className="detalle-principal">
<div className="detalle-img">
<img src={imageUrl} alt={producto.album} />
</div>
<div className="detalle-info">
<h2>{producto.album}</h2>
<h3>{producto.artista}</h3>
 <p className="detalle-precio">${producto.precio}</p>
<p><strong>Género:</strong> {producto.genero}</p>
<button className="detalle-boton-comprar" onClick={() => agregarAlCarrito(producto)}>
Agregar al Carrito
</button>
</div>
</div>
          
{relacionados.length > 0 && (
<div className="relacionados-container">
<h2>También te podría gustar</h2>
<div className="relacionados-grid">
{relacionados.map(prodRelacionado => (
<ProductCard
key={prodRelacionado.id}
producto={prodRelacionado}
/>
))}
</div>
</div>
)}
</div>
);
}

export default ProductDetailPage;