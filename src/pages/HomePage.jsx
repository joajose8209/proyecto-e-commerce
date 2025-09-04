// src/pages/HomePage.jsx

import React from 'react';
import ProductList from '../components/ProductList';

function HomePage({ productos, busqueda, setBusqueda, filtroGenero, setFiltroGenero, agregarAlCarrito, generosUnicos }) {
  
  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  const handleGeneroClick = (genero) => {
    setFiltroGenero(genero);
  };

  return (
    <div>
      <h1>Catálogo de Vinilos</h1>
      
      {/* --- BARRA DE BÚSQUEDA Y FILTROS RECUPERADOS --- */}
      <div style={{ padding: '10px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar por álbum o artista..."
          value={busqueda}
          onChange={handleBusquedaChange}
          style={{ padding: '8px', width: '300px' }}
        />
        <div>
          <span>Filtrar por género:</span>
          <button onClick={() => handleGeneroClick('Todos')} style={{ marginLeft: '10px' }}>Todos</button>
          {generosUnicos.map(genero => (
            <button key={genero} onClick={() => handleGeneroClick(genero)} style={{ marginLeft: '10px' }}>
              {genero}
            </button>
          ))}
        </div>
      </div>

      <ProductList productos={productos} agregarAlCarrito={agregarAlCarrito} />
    </div>
  );
}

export default HomePage;