import React from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

function HomePage({ 
  productos, 
  busqueda, 
  setBusqueda, 
  filtroGenero, 
  setFiltroGenero, 
  agregarAlCarrito, 
  generosUnicos,
// Recibo las props de favoritos
//Sprint 6 Martes elimine props.
//toggleFavorito,
//favoritos
}) {

  return (
    <div>
      <h1>Catálogo de Vinilos</h1>
      
      <Filters 
        terminoBusqueda={busqueda}
        setTerminoBusqueda={setBusqueda}
        generoSeleccionado={filtroGenero}
        setGeneroSeleccionado={setFiltroGenero}
        generos={['Todos', ...(generosUnicos || [])]}
      />

      {/* Pasaje ProductList.Srint 6 Martes borro props.  */}
      <ProductList 
        productos={productos} 
        agregarAlCarrito={agregarAlCarrito} 
      />
    </div>
  );
}

export default HomePage;