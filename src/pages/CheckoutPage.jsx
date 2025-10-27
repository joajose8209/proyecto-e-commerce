import React from 'react';

const CheckoutPage = () => {
return (
<div>
<h1>Página de Checkout</h1> 
<form>
<div>
<label htmlFor='nombre'>Nombre:</label>
<input type="text" id='nombre' name='nombre' />
</div>
<div>
<label htmlFor='email'>Email:</label>
<input type="email" id='email' name='email' />
</div>
<div>
<label htmlFor='telefono'>Telefono:</label>
<input type="tel" id='telefono' name='telefono' />
</div>
<div>
<label htmlFor='direccion'>Direccion:</label>
<input type="text" id='direccion' name='direccion' />
</div>
</form>   
</div>
);
};

export default CheckoutPage;