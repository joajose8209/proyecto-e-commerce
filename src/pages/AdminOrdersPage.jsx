import React, {useState, useEffect} from 'react';
import '../styles/AdminOrdersPage.css';
import {Link} from 'react-router-dom';

const AdminOrdersPage = () => {

const [ordenes, setOrdenes] = useState([]);

useEffect (() => {
const ordenesGuardadas = localStorage.getItem('ordenes');

if(ordenesGuardadas){
setOrdenes(JSON.parse(ordenesGuardadas));    
}

},[]);

const formatPrice = (price) => {
return new Intl.NumberFormat('es-Ar', {
style: 'currency',
currency: 'ARS',    
}).format(price);
};

const handleClearOrders = () => {
if(window.confirm('¿Estás seguro de que quieres borrar TODAS las órdenes? Esta acción no se puede deshacer.')) {
localStorage.removeItem('ordenes');
setOrdenes([]);
}
};

return(
<div className="admin-orders-container">
<h1>Panel de Ordenes</h1>
<p>Aqui se podran ver todas compras generadas y guardadas en el LocalStorage</p>

<div className='admin-actions-container'>
<Link
to="/"
className='admin-action-btn-secondary'
>
&larr; Volver al Inicio
</Link>

<button
onClick={handleClearOrders}
className='admin-action-btn-danger'
>
Limpiar todas las Órdenes
</button>    

</div>




<table className="orders-table">
<thead>
<tr>
<th>FECHA</th>
<th>CLIENTE</th>
<th>EMAIL</th>
<th>TOTAL</th>
<th>ITEMS</th>
</tr>    
</thead>
<tbody>
{ ordenes.length === 0 ? (    
<tr>
<td  colSpan="5" style={{textAlign: 'center'}}>No hay Ordenes para mostrar</td>
</tr> 
) : (
ordenes.slice().reverse().map((orden, index) => (
<tr key={index}>
<td>{new Date(orden.fecha) .toLocaleDateString('es-AR')}</td>
<td>{orden.comprador.nombre}</td>
<td>{orden.comprador.email}</td>
<td>{formatPrice(orden.total)}</td>
<td>{orden.items.length} items</td>
</tr>    
))       
)}
</tbody> 
</table>    
</div>    
);
};

export default AdminOrdersPage;