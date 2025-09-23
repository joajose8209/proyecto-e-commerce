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
  criterioOrden,
  setCriterioOrden,
}) {

  return (
    <div>
      <h1 className='main-title'>Catálogo de Vinilos</h1>
      
      <Filters 
        terminoBusqueda={busqueda}
        setTerminoBusqueda={setBusqueda}
        generoSeleccionado={filtroGenero}
        setGeneroSeleccionado={setFiltroGenero}
        generos={['Todos', ...(generosUnicos || [])]}
        criterioOrden={criterioOrden}
        setCriterioOrden={setCriterioOrden}
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