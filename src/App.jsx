// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Páginas
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import NovedadesPage from './pages/NovedadesPage';
import MorePage from './pages/MorePage';

// Componentes
import Navbar from './components/Navbar';

function App() {
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('Todos');

  useEffect(() => {
    fetch('/data/productos.json')
      .then(response => response.json())
      .then(data => {
        setTodosLosProductos(data);
        setProductosFiltrados(data);
      })
      .catch(error => console.error("Error al cargar los productos:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    let productosTemp = todosLosProductos;
    if (filtroGenero !== 'Todos') {
      productosTemp = productosTemp.filter(p => p.genero === filtroGenero);
    }
    if (busqueda) {
      productosTemp = productosTemp.filter(p =>
        p.album.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.artista.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    setProductosFiltrados(productosTemp);
  }, [busqueda, filtroGenero, todosLosProductos]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto]);
  };
  
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, index) => index !== indiceAEliminar));
  };
  
  // Extraemos los géneros únicos de la lista completa de productos
  const generosUnicos = [...new Set(todosLosProductos.map(p => p.genero))];

  return (
    <div>
      <main style={{ paddingBottom: '80px' }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                productos={productosFiltrados}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                filtroGenero={filtroGenero}
                setFiltroGenero={setFiltroGenero}
                agregarAlCarrito={agregarAlCarrito}
                generosUnicos={generosUnicos} // Nos aseguramos de pasar la prop
              />
            }
          />
          <Route
            path="/vinilo/:id"
            element={
              <ProductDetailPage
                productos={todosLosProductos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route 
            path="/carrito" 
            element={<CartPage carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />} 
          />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/mas" element={<MorePage />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  );
}

export default App;