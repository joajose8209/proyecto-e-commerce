import React, { useState } from 'react';


function CheckoutPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      <form className="checkout-form">
        <h3>Datos de Contacto</h3>
        
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input 
            type="text" 
            id="nombre"
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input 
            type="tel" 
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input 
            type="text" 
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-order-btn">
          Generar Orden (Paso del Jueves)
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;