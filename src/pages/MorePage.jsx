
import React from 'react';
import { Link } from 'react-router-dom';

const MorePage = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Más Opciones</h1>
      <p>Aquí encontrarás información de contacto, sobre nosotros, etc.</p>

      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid var(--color-card-border)', borderRadius: '8px' }}>
        <h2>Panel de Administrador</h2>
        <p>Acceso solo para revisión</p>
        <Link
          to="/admin-ordenes"
          style={{
            textDecoration: 'none',
            padding: '10px 20px', 
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: '5px'
          }}
        >
          Ver Órdenes de Compra
        </Link>
      </div>
    </div>
  );
};

export default MorePage;
