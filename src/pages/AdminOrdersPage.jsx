import React from 'react';
import '../styles/AdminOrdersPage.css';

const AdminOrdersPage = () => {
return(
<div className="admin-orders-container">
<h1>Panel de Ordenes</h1>
<p>Aqui se podran ver todas compras generadas y guardadas en el LocalStorage</p>

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
<tr>
<td>(Prueba) 05/11/2025</td>
<td>(Prueba) Cliente ejemplo</td>
<td>(Prueba) cliente@ejemplo.com</td>
<td>(Prueba) $35000</td>
<td>(Prueba) 2 items</td>
</tr>    
</tbody>    
</table>    
</div>    
);
};

export default AdminOrdersPage;