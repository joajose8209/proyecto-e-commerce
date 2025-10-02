import React from 'react';
import ProductList from '../components/ProductList';
import { isProductNew } from '../utils/isProductNew';

const NovedadesPage = ({productos, agregarAlCarrito}) => {
if(!productos || productos === 0)  {
return <p>Cargando novedades...</p>;  
}

const vinilosNuevos = [...productos]
.filter(producto => isProductNew(producto.fechaAgregado))
.sort((a,b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado))

return (
<div className='container-mt-4'>
<h1 className='mb-4 text-center'>Ultimos Ingresos</h1>
{vinilosNuevos.length > 0 ? ( 
<ProductList
productos={vinilosNuevos}
agregarAlCarrito={agregarAlCarrito}
/>
) : (
<p style={{textAlign:'center'}}>No hay vinilos nuevos por el momento</p>    
) 
}
</div>
);
};

export default NovedadesPage;