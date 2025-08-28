//Importaciones necesarias
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productosService';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Filters from '../components/Filters'; 
import ProductList from '../components/ProductList';
import "../styles/filter.css";

// Función para obtener el carrito del localStorage al inicio
const obtenerCarritoInicial = () => {
  try {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  } catch (error) {
    console.error("Error al parsear el JSON del carrito:", error);
    return []; // En caso de error, devuelve un array vacío
  }
};

  function App() {
  const [productos, setProductos] = useState([]);
  //  Inicializa el estado 'carrito' con los datos del localStorage
  const [carrito, setCarrito] = useState(obtenerCarritoInicial());
  //Estado para el filtro de género
  const [generoSeleccionado, setGeneroSeleccionado] = useState ('Todos');
  //Estado para el termino de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // 2. Ya no es necesario UseEffect para cargar el carrito
  /*
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);
  */

  // 3. Dejo solo el useEffect para guardar
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const cargarProductos = async () => {
      const listaDeProductos = await obtenerProductos();
      setProductos(listaDeProductos);
    };
    cargarProductos();
  }, []);

//agrego variable para filtrar por género y para el termino de búsqueda
const productosMostrados = productos.filter(producto =>{
if (generoSeleccionado === 'Todos') {
return true;
}
return producto.genero === generoSeleccionado;
})
.filter(producto =>{
  const busquedaLower = terminoBusqueda.toLowerCase();
  const artistaLower = producto.artista.toLowerCase();
  const albumLower = producto.album.toLowerCase();
  return artistaLower.includes(busquedaLower) || albumLower.includes(busquedaLower);
});

const todosLosGeneros = productos.map(producto => producto.genero);
const generosUnicos = ['Todos', ...new Set(todosLosGeneros)];

return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Catálogo de Vinilos</h1>
      </div>
      <Cart carrito={carrito} />
      <Filters
        terminoBusqueda={terminoBusqueda}
        setTerminoBusqueda={setTerminoBusqueda}
        generoSeleccionado={generoSeleccionado}
        setGeneroSeleccionado={setGeneroSeleccionado}
        generos={generosUnicos} 
      />
      
      <ProductList
        productos={productosMostrados}
        agregarAlCarrito={agregarAlCarrito}
      />
    </div>
  );
}

export default App;
