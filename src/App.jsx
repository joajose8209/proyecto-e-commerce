// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de páginas existentes de Sprint 4.
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';

// 1. Importo las nuevas páginas que acabo de crear en el Sprint 5.
import FavoritesPage from './pages/Favoritespage';
import CartPage from './pages/CartPage';
import NovedadesPage from './pages/NovedadesPage';
import MorePage from './pages/MorePage';

// Importación de componentes
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  // --- ESTADO CENTRALIZADO (sin cambios luego de mi Sprint 5) ---
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('Todos');

  // --- EFECTOS (sin cambios en el sprint 5.) ---
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

  return (
    <div>
      <Cart carrito={carrito} />
      <main style={{ paddingBottom: '80px' }}>
        <Routes>
          {/* Rutas existentes */}
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
                generosUnicos={[...new Set(todosLosProductos.map(p => p.genero))]}
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

          {/* 2. Añadi las nuevas rutas aquí-Sprint 5 */}
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/mas" element={<MorePage />} />

        </Routes>
      </main>
      <Navbar />
    </div>
  );
}

export default App;