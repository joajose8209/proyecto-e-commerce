import React from 'react';
import ProductCard from './ProductCard'; 

// 1. Aqui  recibo las nuevas props: toggleFavorito y favoritos
const ProductList = ({ productos, agregarAlCarrito, toggleFavorito, favoritos }) => {
  
  if (!productos || productos.length === 0) {
    return <p>No se encontraron vinilos.</p>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {productos.map(producto => (
        <ProductCard 
          key={producto.id} 
          producto={producto} 
          agregarAlCarrito={agregarAlCarrito}
          // 2. pasaje a cada ProductCard
          toggleFavorito={toggleFavorito}
          favoritos={favoritos}
        />
      ))}
    </div>
  );
};

export default ProductList;