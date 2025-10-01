import React from 'react';
import ProductList from '../components/ProductList';
const NovedadesPage = ({productos, agregarAlCarrito}) => {
if(!productos || productos === 0)  {
return <p>Cargando novedades...</p>;  
}

const productosMasNuevos = [...productos]
.sort((a,b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado))
.slice(0,8);

return (
<div className='container-mt-4'>
<h1 className='mb-4 text-center'>Ultimos Ingresos</h1>
{/*--Reutilizacion del componente ProductList.--*/}
<ProductList
productos={productosMasNuevos}
agregarAlCarrito={agregarAlCarrito}
/>
</div>
);
};

export default NovedadesPage;