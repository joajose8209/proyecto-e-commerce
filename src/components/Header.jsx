import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import '../styles/Header.css';

const Header = () => {
return (
<header className="main-header">

<Link to="/" className="header-logo">    
<img src="/images/logo.jpg" alt="Logo Tienda de Vinilos" />
<span className="header-title">Vinyl Store</span>
</Link>
  
<div className="header-actions">
<ThemeSwitcher />
</div>
</header>
);
};

export default Header;