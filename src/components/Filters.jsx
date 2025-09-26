import React from 'react';
import { useContext } from 'react'; // Importacion de useContext para "hablar" con el contexto
import { FiltersContext } from '../context/FiltersContext.jsx'; // Importamos la definición de contexto
import '../styles/filter.css';

// El componente ya no recibe un montón de props. 
// Solo necesita 'generos' para poder renderizar la lista de botones.
function Filters({ generos = [] }) {
  // Obtenemos todo lo del contexto
  const {
    busqueda,
    setBusqueda,
    filtroGenero,
    setFiltroGenero,
    criterioOrden,
    setCriterioOrden
  } = useContext(FiltersContext);

  return (
    <>
      <div className="search-container">
        <label htmlFor="search-input">Buscar por artista o album </label>
        <input
          id="search-input"
          name="busqueda"
          className='search-input'
          type="text"
          placeholder='Buscar por artista o album....'
          // 3. Usamos los valores y funciones del contexto
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Sprint 7 etiqueta select */}
      <div className="sort-container">
        <label htmlFor='sort-select'>Ordenar por:</label>
        <select id='sort-select' name='sort'
          // 3. Usamos los valores y funciones del contexto
          value={criterioOrden}
          onChange={(e) => setCriterioOrden(e.target.value)}
        >
          <option value="predeterminado">Predeterminado</option>
          <option value="precio-asc">Precio: Menor a Mayor</option>
          <option value="precio-desc">Precio: Mayor a Menor</option>
          <option value="alfa-asc">Alfabeticamente (A-Z)</option>
        </select>
      </div>

      {/* Agrego botones para filtrar por genero 
        (Este bloque de botones individuales lo mantengo comentado como en tu original)
      */}

      {/* 2. voy a reemplazar los botones hardcodeados por un .map() dinámico */}
      <div className='filter-container' style={{ padding: '20px' }}>
        {generos.map((genero) => (
          <button
            key={genero}
            // 3. Usamos los valores y funciones del contexto
            onClick={() => setFiltroGenero(genero)}
            className={`boton-filtro ${filtroGenero === genero ? 'boton-filtro-activo' : ''}`}
          >
            {genero}
          </button>
        ))}
      </div>
    </>
  );
}

export default Filters;