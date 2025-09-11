import React from 'react';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';

// Reciben la lista de favoritos y las funciones desde App.jsx
const FavoritesPage = ({ favoritos, agregarAlCarrito, toggleFavorito }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>❤️ Tus Vinilos Favoritos</h1>

      {favoritos.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Aún no has guardado ningún vinilo como favorito.</p>
          <Link to="/" className="btn-primary">Explorar Catálogo</Link>
        </div>
      ) : (
        <ProductList 
          productos={favoritos} 
          // Pasar las props que necesita ProductList
          agregarAlCarrito={agregarAlCarrito}
          toggleFavorito={toggleFavorito}
          favoritos={favoritos}
        />
      )}
    </div>
  );
};

export default FavoritesPage;