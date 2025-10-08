import React from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import Paginacion from '../components/Paginacion'; // 1. IMPORTAMOS el nuevo componente

// El componente ahora recibe más props que vienen desde App.jsx
function HomePage({ 
  productos, 
  agregarAlCarrito, 
  generosUnicos,
  productosPorPagina,
  totalProductos,
  paginar,
  paginaActual 
}) {

  return (
    <div>
      <h1 className='main-title'>Catálogo de Vinilos</h1>
      
      <Filters 
        generos={['Todos', ...(generosUnicos || [])]}
      />

      <ProductList 
        productos={productos} 
        agregarAlCarrito={agregarAlCarrito} 
      />

      {/* 2. RENDERIZAMOS el componente de paginación al final de la página */}
      <Paginacion 
        productosPorPagina={productosPorPagina}
        totalProductos={totalProductos}
        paginar={paginar}
        paginaActual={paginaActual}
      />
    </div>
  );
}

export default HomePage;