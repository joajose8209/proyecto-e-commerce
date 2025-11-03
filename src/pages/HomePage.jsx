import React from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import Paginacion from '../components/Paginacion'; 
import HeroBanner from '../components/HeroBanner';

function HomePage({ 
productos, 
agregarAlCarrito, 
generosUnicos,
productosPorPagina,
totalProductos,
paginar,
paginaActual,
paginaSiguiente,
paginaAnterior 
}) {

return (
<main className='homepage-container'>
<HeroBanner />    
<h1 className='main-title'>Catálogo de Vinilos</h1>
      
<Filters 
generos={['Todos', ...(generosUnicos || [])]}
/>

<ProductList 
productos={productos} 
agregarAlCarrito={agregarAlCarrito} 
/> 

<Paginacion 
productosPorPagina={productosPorPagina}
totalProductos={totalProductos}
paginar={paginar}
paginaActual={paginaActual}
paginaSiguiente={paginaSiguiente}
paginaAnterior={paginaAnterior}
/>
</main>
);
}

export default HomePage;