import React from 'react';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesPage = ({agregarAlCarrito }) => {  
const { favoritos, toggleFavorito } = useFavorites();

return (
<div style={{ padding: '20px' }}>
<h1 style={{textAlign: 'center'}}>
❤️ Tus Vinilos Favoritos</h1>
{favoritos.length === 0 ? (
<div style={{ textAlign: 'center', marginTop: '50px' }}>
<p>Aún no has guardado ningún vinilo como favorito.</p>
<Link to="/" className="btn-primary">Explorar Catálogo</Link>
</div>
) : (
<ProductList
productos={favoritos} 
agregarAlCarrito={agregarAlCarrito}
toggleFavorito={toggleFavorito}
favoritos={favoritos}
/>
)}
</div>
);
};

export default FavoritesPage;