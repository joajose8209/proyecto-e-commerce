// src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import ProductDetailPage from './pages/ProductDetailPage';

// 1. Importamos nuestro componente Cart. Asegúrate de que la ruta sea correcta.
import Cart from './components/Cart';

function App() {
  // --- ESTADO CENTRALIZADO ---
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('Todos');

  // --- EFECTOS (LÓGICA) ---
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
      {/* 2. Renderizamos el componente Cart aquí y le pasamos el estado del carrito. */}
      {/* Lo ponemos fuera de <Routes> para que sea visible en todas las páginas. */}
      <Cart carrito={carrito} />

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
      </Routes>
    </div>
  );
}

export default App;