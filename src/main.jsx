import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'; 
import './styles/index.css';

// Contexts
import { FavoritesProvider } from './context/FavoritesContext';
import { FiltersProvider } from './context/FiltersContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<BrowserRouter>
<ThemeProvider>
<FavoritesProvider>
<FiltersProvider> 
<App />
</FiltersProvider>
</FavoritesProvider>  
</ThemeProvider>
</BrowserRouter>
</React.StrictMode>
);