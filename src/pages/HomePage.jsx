// src/pages/HomePage.jsx

import React from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

// HomePage ahora solo se preocupa de recibir y pasar las props correctas.
function HomePage({ 
  productos, 
  busqueda, 
  setBusqueda, 
  filtroGenero, 
  setFiltroGenero, 
  agregarAlCarrito, 
  generosUnicos 
}) {

  return (
    <div>
      <h1>Catálogo de Vinilos</h1>
      
      <Filters 
        terminoBusqueda={busqueda}
        setTerminoBusqueda={setBusqueda}
        generoSeleccionado={filtroGenero}
        setGeneroSeleccionado={setFiltroGenero}
        // Le pasamos los géneros únicos, asegurándonos de que sea un array
        generos={['Todos', ...(generosUnicos || [])]}
      />

      <ProductList productos={productos} agregarAlCarrito={agregarAlCarrito} />
    </div>
  );
}

export default HomePage;