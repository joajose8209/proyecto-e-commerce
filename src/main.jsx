import React from 'react';
import ReactDOM from 'react-dom/client';
//Sprint 4 importar BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'; 
import './styles/index.css';
// Sprint 6 Martes Importo el Proveedor de Favoritos
import {FavoritesProvider} from './context/FavoritesContext';
//Sprint 6 importacion del ThemeProvider
import {ThemeProvider} from './context/ThemeContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* 2. Sprint 6 envuelvo la App. Ahora todo lo que esté adentro
          puede acceder a la información de Favoritos y del Tema. */}
    <FavoritesProvider>
      <App />
    </FavoritesProvider>  
    </BrowserRouter>
  </React.StrictMode>
);