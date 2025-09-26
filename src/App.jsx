import React, { useState, useEffect, useContext } from 'react'; // 1. Agregamos 'useContext'
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
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem('carrito');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  //Aqui tenia antes de Contex Api Favoritos cargada desde localStorage.

  // Ya no se necesita los 'useState' para los filtros.
  // Ahora se consumen los valores directamente desde el Context.
  const { busqueda, filtroGenero, criterioOrden } = useContext(FiltersContext);

  // --- EFECTOS ---
  useEffect(() => {
    fetch('/data/productos.json')
      .then(response => response.json())
      .then(data => {
        setTodosLosProductos(data);
  // setProductosFiltrados(data); // Ya no es necesario, el siguiente useEffect se encarga
      })
      .catch(error => console.error("Error al cargar los productos:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  //Aqui estaba antes de Contex Api guardar la libreta de favoritos en Storage cada vez que cambia.

  useEffect(() => {
    // La lógica de filtrado y ordenamiento se mantiene igual,
    // pero ahora reacciona a los cambios del contexto.
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
    
    const productosOrdenados = [...productosTemp];
    if (criterioOrden === 'precio-asc') {
      productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (criterioOrden === 'precio-desc') {
      productosOrdenados.sort((a, b) => b.precio - a.precio);
    } else if (criterioOrden === 'alfa-asc') {
      productosOrdenados.sort((a, b) => a.album.localeCompare(b.album));
    }
    
    setProductosFiltrados(productosOrdenados);

  }, [busqueda, filtroGenero, criterioOrden, todosLosProductos]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto]);
  };

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, index) => index !== indiceAEliminar));
  };

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
                agregarAlCarrito={agregarAlCarrito}
                // PROPS LIMPIAS!
                // Ya no hay pasaje de  los estados de los filtros.
                // El componente de filtros los tomará del contexto.
                generosUnicos={generosUnicos}
                // Sprint 6 Martes elimine props. 
                // toggleFavorito={toggleFavorito}
                // favoritos={favoritos}
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

          {/* 5. Pasar la lista de favoritos a su página */}
          {/* Sprint 6 Martes borrare de aqui losas props. */}
          <Route path="/favoritos" element={<FavoritesPage agregarAlCarrito={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={<CartPage carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />}
          />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/mas" element={<MorePage />} />
        </Routes>
      </main>
      <Navbar cantidadCarrito={carrito.length} />
    </div>
  );
}

export default App;