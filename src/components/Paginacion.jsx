import React from 'react';
import '../styles/Paginacion.css';

const Paginacion = ({productosPorPagina, totalProductos, paginar, paginaActual,
paginaSiguiente, paginaAnterior}) => {
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
<li>
<button onClick={paginaAnterior}
disabled={paginaActual ===1} className="paginacion-link">
Anterior
</button>
</li>    
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
<li>
<button onClick={paginaSiguiente}
disabled={paginaActual === totalPaginas}
className='paginacion-link'
>
Siguiente    
</button>    
</li>
</ul>
</nav>     
);
};

export default Paginacion;