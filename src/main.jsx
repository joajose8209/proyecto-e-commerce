// main.jsx (versión corregida)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'; 
import './styles/index.css';

// Contexts
import { FavoritesProvider } from './context/FavoritesContext';
import { FiltersProvider } from './context/FiltersContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <FiltersProvider> 
          <App />
        </FiltersProvider>
      </FavoritesProvider>  
    </BrowserRouter>
  </React.StrictMode>
);