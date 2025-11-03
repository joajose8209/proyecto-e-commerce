import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/HeroBanner.css';

const HeroBanner = () => {
return(    
<section className='hero-banner'>
<div className='hero-content'>
<h2 className='hero-title'>La Experiencia del Vinilo</h2>
<p className='hero-subtitle'>Descubre los Clasicos y las nuevas Joyas</p>
<Link to="/novedades" className='hero-button'>
Ver Novedades
</Link>
</div>
</section>
);    
};

export default HeroBanner;