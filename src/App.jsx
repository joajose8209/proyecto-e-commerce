import React, { useState, useEffect, useContext, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiltersContext } from './context/FiltersContext'; 
import { ThemeContext, useTheme } from './context/ThemeContext';

// Páginas
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import NovedadesPage from './pages/NovedadesPage';
import MorePage from './pages/MorePage';
import CheckoutPage from './pages/CheckoutPage';


import Navbar from './components/Navbar';

function App() {

const [todosLosProductos, setTodosLosProductos] = useState([]);
const [productosFiltrados, setProductosFiltrados] = useState([]);
  
const [paginaActual, setPaginaActual] = useState(1);
const [productosPorPagina] = useState(12);

const { busqueda, filtroGenero, criterioOrden } = useContext(FiltersContext);
const {theme} = useTheme();

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

if (paginaActual !== 1) {
setPaginaActual(1);
}
  
}, [busqueda, filtroGenero, criterioOrden, todosLosProductos]);

const isInitialMount = useRef(true);

useEffect(() => {
if(isInitialMount.current){
isInitialMount.current = false;
} else {
setPaginaActual(1);
}
}, [busqueda, filtroGenero, criterioOrden ]);

const generosUnicos = [...new Set(todosLosProductos.map(p => p.genero))];

const paginar = (numeroDePagina) => {
setPaginaActual(numeroDePagina);
};

const paginaSiguiente = () => {
const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
if(paginaActual < totalPaginas) {
setPaginaActual(paginaActual + 1);    
}   
};

const paginaAnterior = () => {
if(paginaActual > 1) {
setPaginaActual(paginaActual -1);    
}    
}


const indiceDelUltimoProducto = paginaActual * productosPorPagina;
const indiceDelPrimerProducto = indiceDelUltimoProducto - productosPorPagina;
const productosPaginados = productosFiltrados.slice(indiceDelPrimerProducto, indiceDelUltimoProducto);

  
return (
<div className={theme}>
<main style={{ paddingBottom: '80px' }}>
<Routes>
<Route
path="/"
element={
<HomePage
productos={productosPaginados}
generosUnicos={generosUnicos}
productosPorPagina={productosPorPagina}
totalProductos={productosFiltrados.length}
paginar={paginar}
paginaActual={paginaActual}
paginaSiguiente={paginaSiguiente}
paginaAnterior={paginaAnterior}
/>
}
/>
<Route
path="/vinilo/:id"
element={
<ProductDetailPage
productos={todosLosProductos}
/>
}
/>
<Route path="/favoritos" element={<FavoritesPage />} />
<Route
path="/carrito"
element={<CartPage />}
/>
<Route path="/novedades" element={<NovedadesPage productos={todosLosProductos} />} />
<Route path="/mas" element={<MorePage />} />
<Route path='/checkout' element={<CheckoutPage />} />
</Routes>
</main>
<Navbar />
</div>
);
}

export default App;