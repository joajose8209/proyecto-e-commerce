import React, { createContext, useState, useEffect, useContext } from 'react'

export const FavoritesContext = createContext();

export const useFavorites = () => {
return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  
const [favoritos, setFavoritos] = useState(() => {
const favoritosGuardados = localStorage.getItem('favoritos');
return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
});

useEffect(() => {
localStorage.setItem('favoritos', JSON.stringify(favoritos));
}, [favoritos]);

const toggleFavorito = (producto) => {
const esFavorito = favoritos.some(fav => fav.id === producto.id);
if (esFavorito) {
setFavoritos(prevFavoritos => prevFavoritos.filter(fav => fav.id !== producto.id));
} else {
setFavoritos(prevFavoritos => [...prevFavoritos, producto]);
}
};

const value = {
favoritos,
toggleFavorito,
};

return (
<FavoritesContext.Provider value={value}>
{children}
</FavoritesContext.Provider>
);
};
