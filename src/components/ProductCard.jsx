import React from "react";
import { Link } from "react-router-dom";
import '../styles/ProductCard.css';

// 1. Aqui reciblo las nuevas "herramientas": toggleFavorito y la lista de favoritos
const ProductCard = ({ producto, agregarAlCarrito, toggleFavorito, favoritos }) => {
  const detailUrl = `/vinilo/${producto.id}`;

  // 2. Verificacion si el  producto  ya está en la lista de favoritos
  const esFavorito = favoritos.some(fav => fav.id === producto.id);

  return (
    <div className="product-card">
      <Link to={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={`/img/${producto.imagen}`} alt={producto.album} className="product-image" />
        <div className="product-info">
          <h3>{producto.album}</h3>
          <p>Artista: {producto.artista}</p>
          <p>Precio: ${producto.precio}</p>
          <p>Genero: {producto.genero}</p>
        </div>
      </Link>

      <div className="product-card-actions">
        {/* 3. Crecion  nuevo botón de favoritos */}
        <button 
          // La clase cambia si es favorito o no, para que el corazón se vea "lleno" o "vacío"
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