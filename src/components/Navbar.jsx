import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import { IoHome, IoHeart, IoCart, IoSparkles, IoMenu } from "react-icons/io5";
import {useCart} from '../context/CartContext';

const CartBadge = ({count}) => {
if(count === 0) return null;
return <span className="cart-badge">{count}</span>;
}

const Navbar = () => {
 
const {carrito} = useCart();

const getNavLinkClass = ({ isActive }) => {
return isActive ? 'custom-nav__item active' : 'custom-nav__item';
};
const getCartLinkClass = ({ isActive }) => {
return isActive ? 'custom-nav__item custom-nav__cart-item active' : 'custom-nav__item custom-nav__cart-item';
};     
return (
<nav className="custom-navbar-bottom">
    
<div className="custom-nav">
    
<NavLink to="/" className={getNavLinkClass}>
<span className="nav-icon"><IoHome /></span>
<span className="nav-text">Home</span>
</NavLink>
    
<NavLink to="/favoritos" className={getNavLinkClass}>
<span className="nav-icon"><IoHeart /></span>
<span className="nav-text">Favoritos</span>
</NavLink>

<NavLink to="/carrito" className={getCartLinkClass}>
<CartBadge count={carrito.length} />
<span className="nav-icon"><IoCart /></span>
<span className="nav-text">Carrito</span>
</NavLink>

<NavLink to="/novedades" className={getNavLinkClass}>
<span className="nav-icon"><IoSparkles /></span>
<span className="nav-text">Novedades</span>
</NavLink>

<NavLink to="/mas" className={getNavLinkClass}>
<span className="nav-icon"><IoMenu /></span>
<span className="nav-text">Más</span>
</NavLink>

</div>
   
</nav>)}
 
export default Navbar;