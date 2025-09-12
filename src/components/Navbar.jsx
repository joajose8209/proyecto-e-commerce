//Estructura de la barra de navegación
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
//Sprint 5, agrego un contador al icono del carrito
const CartBadge = ({count}) => {
if(count === 0) return null;// Esto para que no muestre nada si el contador es 0
return <span className="cart-badge">{count}</span>;
}

const Navbar = ({cantidadCarrito}) => {
 // Función para aplicar la clase 'active' cuando el enlace coincide con la URL
 const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-item active' : 'nav-item';
  };
 const getCartLinkClass = ({ isActive }) => {
    // Para el carrito, aplicacion de  clases especiales
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
   <CartBadge count={cantidadCarrito} />{/* el CartBadge del contador*/}
    <span className="nav-icon">🛒</span>
    <span className="nav-text">Carrito</span>
    </NavLink>
    
    <NavLink to="/novedades" className={getNavLinkClass}>
    <span className="nav-icon">🆕</span>
    <span className="nav-text">Novedades</span>
    </NavLink>
    
    <NavLink to="/mas" className={getNavLinkClass}>
    <span className="nav-icon">➕</span>
    <span className="nav-text">Más</span>
    </NavLink>
    
    </div>
   
   </nav>)}
 
 export default Navbar;