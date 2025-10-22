import React, {createContext, useState, useEffect, useContext} from 'react';

export const CartContex = createContext();

export const useCart = () => {
return useContext(CartContex);
};

export const CartProvider = ({children}) => {
const [carrito, setCarrito] = useState(() => {
const carritoGuardado = localStorage.getItem('carrito');
return carritoGuardado ? JSON.parse(carritoGuardado) : [];
});
useEffect(() => {
localStorage.setItem('carrito', JSON.stringify(carrito));
}, [carrito]);

const agregarAlCarrito = (producto) => {
console.log('Añadiendo al carrito (Desde Contexto)', producto);
setCarrito(prevCarrito => [...prevCarrito, producto]);    
};

const eliminarDelCarrito = (indiceAEliminar) => {
setCarrito(prevCarrito => prevCarrito.filter((_,index) => index !== indiceAEliminar));
};
const value = {
carrito,
agregarAlCarrito,
eliminarDelCarrito,
};

return (
<CartContex.Provider value={value}>
{children}
</CartContex.Provider>    
);
}; 
