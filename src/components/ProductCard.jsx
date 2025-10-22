import React from "react";
import { Link } from "react-router-dom";
import '../styles/ProductCard.css';
import { useFavorites } from '../context/FavoritesContext';
import { getImageUrl } from '../utils/getImageUrl';
import { isProductNew } from "../utils/isProductNew";
import { useCart } from "../context/CartContext";

const ProductCard = ({ producto}) => {
const {favoritos, toggleFavorito} = useFavorites();
const {agregarAlCarrito} = useCart();
const detailUrl = `/vinilo/${producto.id}`;
const esFavorito = favoritos.some(fav => fav.id === producto.id);
const imageUrl = getImageUrl(producto);

const esNuevo = isProductNew(producto.fechaAgregado);

return (
<div className="product-card">
{esNuevo ? <span className="badge-nuevo">¡NUEVO!</span> : null}    
<Link to={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
<img 
src={imageUrl}
alt={producto.album} 
className="product-image" 
/>
<div className="product-info">
<h3>{producto.album}</h3>
<p>Artista: {producto.artista}</p>
<p>Precio: ${producto.precio}</p>
<p>Genero: {producto.genero}</p>
</div>
</Link>
<div className="product-card-actions">
 <button 
 className={`btn-favorite ${esFavorito ? 'favorited' : ''}`}
 onClick={() => toggleFavorito(producto)}
 >
 ❤️
</button>
<button onClick={(e) => {
e.preventDefault();
agregarAlCarrito(producto);
}}>
Agregar al Carrito
</button>
</div>
</div>
);
};

export default ProductCard;