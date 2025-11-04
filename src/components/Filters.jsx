import React from 'react';
import { useContext } from 'react'; 
import { FiltersContext } from '../context/FiltersContext.jsx'; 
import '../styles/filter.css';

function Filters({ generos = [] }) {
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
<div className="filter-bar-top">
<div className="search-container">
<label htmlFor="search-input">Buscar:</label>
<input
id="search-input"
name="busqueda"
className='search-input'
type="text"
placeholder='Buscar por artista o album....'
value={busqueda}
onChange={(e) => setBusqueda(e.target.value)}
/>
</div>
<div className="sort-container">
<label htmlFor='sort-select'>Ordenar por:</label>
<select id='sort-select' name='sort'
value={criterioOrden}
onChange={(e) => setCriterioOrden(e.target.value)}
>
<option value="predeterminado">Predeterminado</option>
<option value="precio-asc">Precio: Menor a Mayor</option>
<option value="precio-desc">Precio: Mayor a Menor</option>
<option value="alfa-asc">Alfabeticamente (A-Z)</option>
</select>
</div>
</div>

<div className='filter-container' style={{ padding: '20px' }}>
{generos.map((genero) => (
<button
key={genero}
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