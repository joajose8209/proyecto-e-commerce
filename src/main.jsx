import React from 'react';
import ReactDOM from 'react-dom/client';
//Sprint 4 importar BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'; 
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);