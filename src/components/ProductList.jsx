// src/components/ProductList.jsx

import React from 'react';
// 1. Esta es la línea que faltaba. Le decimos al archivo qué es y dónde encontrar "ProductCard".
import ProductCard from './ProductCard'; 

// El componente recibe "productos" desde HomePage
const ProductList = ({ productos, agregarAlCarrito }) => {
  
  // Verificación: Si no hay productos o la lista está vacía, muestra un mensaje.
  if (!productos || productos.length === 0) {
    return <p>No se encontraron vinilos que coincidan con tu búsqueda.</p>;
  }

  // Si hay productos, los mapea y muestra
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {productos.map(producto => (
        <ProductCard 
          key={producto.id} 
          producto={producto} 
          agregarAlCarrito={agregarAlCarrito}
        />
      ))}
    </div>
  );
};

export default ProductList;