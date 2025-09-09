//Estructura de la barra de navegación
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
 // Función para aplicar la clase 'active' cuando el enlace coincide con la URL
 const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-item active' : 'nav-item';
  };
 const getCartLinkClass = ({ isActive }) => {
    // Para el carrito, aplicamos clases especiales
    return isActive ? 'nav-item cart-item active' : 'nav-item cart-item';
  };     
return (
    <nav className="navbar">
    
    <div className="navbar-container">
    
    <NavLink to="/" className={getNavLinkClass}>
    <span className="nav-icon">🏠</span>
    <span className="nav-text">Home</span>
    </NavLink>
    
    <NavLink to="/favoritos" className={getNavLinkClass}>
    <span className="nav-icon">❤️</span>
    <span className="nav-text">Favoritos</span>
    </NavLink>
    
    <NavLink to="/carrito" className={getCartLinkClass}>
    <span className="nav-icon">🛒</span>
    <span className="nav-text">Carrito</span>
    </NavLink>
    
    <NavLink to="/novedades" className={getNavLinkClass}>
    <span className="nav-icon">🆕</span>
    <span className="nav-text">Novedades</span>
    </NavLink>
    
    <NavLink to="/mas" className={`${getNavLinkClass({ isActive: false })} settings-item`}>
    <span className="nav-icon">⚙️</span>
    <span className="nav-text">Más</span>
    </NavLink>
    
    </div>
   
   </nav>)}
 
 export default Navbar;