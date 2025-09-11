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
  toggleFavorito,
  favoritos
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

      {/* Pasaje ProductList */}
      <ProductList 
        productos={productos} 
        agregarAlCarrito={agregarAlCarrito} 
        toggleFavorito={toggleFavorito}
        favoritos={favoritos}
      />
    </div>
  );
}

export default HomePage;