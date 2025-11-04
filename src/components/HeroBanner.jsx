import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/HeroBanner.css';

const HeroBanner = () => {
return(    
<section className='hero-banner'>
<div className='hero-content'>
<h2 className='hero-titulo'>EL SONIDO INMORTAL</h2>
<p className='hero-subtitulo'>Clásicos del rock, joyas del jazz y las últimas novedades en vinilo.</p>
<Link to="/novedades" className='hero-boton'>
Ver Novedades
</Link>
</div>
</section>
);    
};

export default HeroBanner;