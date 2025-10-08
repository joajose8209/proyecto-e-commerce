import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiltersContext } from './context/FiltersContext'; 

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
  // --- ESTADOS PRINCIPALES ---
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  
  // --- ESTADOS PARA PAGINACIÓN ---
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(12);

  // --- CONTEXTOS ---
  const { busqueda, filtroGenero, criterioOrden } = useContext(FiltersContext);
  // La línea incorrecta ha sido eliminada de aquí.

  // --- EFECTOS (useEffect) ---
  useEffect(() => {
    fetch('/data/productos.json')
      .then(response => response.json())
      .then(data => {
        setTodosLosProductos(data);
        const productosOrdenadosPorDefecto = [...data].sort((a, b) => {
          return new Date(b.fechaAgregado) - new Date(a.fechaAgregado);
        });
        setProductosFiltrados(productosOrdenadosPorDefecto);    
      })
      .catch(error => console.error("Error al cargar los productos:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (todosLosProductos.length === 0) {
      return;
    }
    let productosTemp = [...todosLosProductos];
    if (filtroGenero !== 'Todos') {
      productosTemp = productosTemp.filter(p => p.genero === filtroGenero);
    }
    if (busqueda) {
      productosTemp = productosTemp.filter(p =>
        p.album.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.artista.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    
    const productosOrdenados = [...productosTemp];
    if (criterioOrden === 'precio-asc') {
      productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (criterioOrden === 'precio-desc') {
      productosOrdenados.sort((a, b) => b.precio - a.precio);
    } else if (criterioOrden === 'alfa-asc') {
      productosOrdenados.sort((a, b) => a.album.localeCompare(b.album));
    } else { 
      productosOrdenados.sort((a, b) => new Date(b.fechaAgregado) - new Date(a.fechaAgregado));
    }
    
    setProductosFiltrados(productosOrdenados);
  }, [busqueda, filtroGenero, criterioOrden, todosLosProductos]);

  // --- FUNCIONES Y LÓGICA ---
  const agregarAlCarrito = (producto) => {
    console.log('Añadiendo al carrito desde:', window.location.pathname, producto)  
    setCarrito(prevCarrito => [...prevCarrito, producto]);
  };

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, index) => index !== indiceAEliminar));
  };

  const generosUnicos = [...new Set(todosLosProductos.map(p => p.genero))];

  // Función para cambiar de página (para la paginación)
  const paginar = (numeroDePagina) => {
    setPaginaActual(numeroDePagina);
  };

  // Lógica de cálculo de paginación
  const indiceDelUltimoProducto = paginaActual * productosPorPagina;
  const indiceDelPrimerProducto = indiceDelUltimoProducto - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indiceDelPrimerProducto, indiceDelUltimoProducto);

  // --- RENDERIZADO ---
  return (
    <div>
      <main style={{ paddingBottom: '80px' }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                productos={productosPaginados}
                agregarAlCarrito={agregarAlCarrito}
                generosUnicos={generosUnicos}
                productosPorPagina={productosPorPagina}
                totalProductos={productosFiltrados.length}
                paginar={paginar}
                paginaActual={paginaActual}
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
          <Route path="/favoritos" element={<FavoritesPage agregarAlCarrito={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={<CartPage carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />}
          />
          <Route path="/novedades" element={<NovedadesPage productos={todosLosProductos} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/mas" element={<MorePage />} />
        </Routes>
      </main>
      <Navbar cantidadCarrito={carrito.length} />
    </div>
  );
}

export default App;