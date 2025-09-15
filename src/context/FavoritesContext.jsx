import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Creo como yo lo llamo "tablón de anuncios" (el Contexto).
//    importacion  para que otros archivos puedan usarlo si es necesario.
export const FavoritesContext = createContext();

// 2. Creo un "atajo" (Hook personalizado) para que los componentes 
//    puedan leer el tablón de anuncios fácilmente sin escribir tanto código.
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// 3. Creo lo que llamo  "Proveedor", el componente que se encarga de mantener y
//    distribuir la información en el tablón de anuncios.
export const FavoritesProvider = ({ children }) => {
  
  // 4. MOVER LA LÓGICA DESDE App.jsx AQUÍ.
  //    Esta es la información que estará en lo que llamo tablón.
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  // Este efecto secundario también lo muevo aquí para mantener todo junto.
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

  // 5. Preparar el "paquete" de información  a compartir.
  //    Cualquier componente podrá acceder a `favoritos` y a `toggleFavorito`.
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
