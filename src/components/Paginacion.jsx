import React from 'react';
import '../styles/Paginacion.css';

const Paginacion = ({productosPorPagina, totalProductos, paginar, paginaActual}) => {
const numerosDePagina = [];

const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

for (let i = 1;  i <= totalPaginas; i++) {
numerosDePagina.push(i);    
}
if (totalPaginas <= 1) {
return null;    
}
return (
<nav className='paginacion-container'>
<ul className='paginacion-list'>
{numerosDePagina.map(numero => (
<li key={numero} className='paginacion-item'>
<button
onClick={() => paginar(numero)}
className={`paginacion-link ${paginaActual === numero ? 'active' : ''}`}
>
{numero}    
</button>    
</li>    
))}
</ul>
</nav>     
);

};

export default Paginacion;