//Importaciones necesarias
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productosService';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

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
  // 1. Inicializa el estado 'carrito' con los datos del localStorage
  const [carrito, setCarrito] = useState(obtenerCarritoInicial());

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

  // 2. Ya no es necesario UseEffect para cargar el carrito desde localStorage
  /*
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);
  */

  // 3. Dejamos solo el useEffect para guardar
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Catálogo de Vinilos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productos.map(producto => (
          <ProductCard 
            key={producto.id} 
            producto={producto}
            agregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>
      <Cart carrito={carrito} />
    </div>
  );
}

export default App;
