import React from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';

const MorePage = () => {
return (
<div style={{ padding: '20px', textAlign: 'center' }}>
<h1>Más Opciones</h1>
<p>Aquí encontrarás información de contacto, sobre nosotros, etc.</p>
<h2>Configuración de Apariencia</h2>
<ThemeSwitcher />
</div>
);
};

export default MorePage;