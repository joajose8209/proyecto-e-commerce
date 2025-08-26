//Importaciones necesarias
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productosService';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
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

//agrego variable para filtrar por género
const productosFiltrados = productos.filter(producto =>{
if (generoSeleccionado === 'Todos') {
return true;
}
return producto.genero === generoSeleccionado;
});

return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Catálogo de Vinilos</h1>
      {/* Agrego botones para filtrar por genero */}
      <div>
  <button 
    onClick={() => setGeneroSeleccionado('Todos')}
    className={`boton-filtro ${generoSeleccionado === 'Todos' ? 'boton-filtro-activo' : ''}`}
  >
    Todos
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Rock Progresivo')}
    className={`boton-filtro ${generoSeleccionado === 'Rock Progresivo' ? 'boton-filtro-activo' : ''}`}
  >
    Rock Progresivo
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Hard Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Hard Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Hard Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Grunge')}
    className={`boton-filtro ${generoSeleccionado === 'Grunge' ? 'boton-filtro-activo' : ''}`}
  >
    Grunge
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Pop')}
    className={`boton-filtro ${generoSeleccionado === 'Pop' ? 'boton-filtro-activo' : ''}`}
  >
    Pop
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Heavy Metal')}
    className={`boton-filtro ${generoSeleccionado === 'Heavy Metal' ? 'boton-filtro-activo' : ''}`}
  >
    Heavy Metal
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Glam Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Glam Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Glam Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Pop Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Pop Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Pop Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Blues Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Blues Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Blues Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Reggae')}
    className={`boton-filtro ${generoSeleccionado === 'Reggae' ? 'boton-filtro-activo' : ''}`}
  >
    Reggae
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('New Wave')}
    className={`boton-filtro ${generoSeleccionado === 'New Wave' ? 'boton-filtro-activo' : ''}`}
  >
    New Wave
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Punk Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Punk Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Punk Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Rock Alternativo')}
    className={`boton-filtro ${generoSeleccionado === 'Rock Alternativo' ? 'boton-filtro-activo' : ''}`}
  >
    Rock Alternativo
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Indie Rock')}
    className={`boton-filtro ${generoSeleccionado === 'Indie Rock' ? 'boton-filtro-activo' : ''}`}
  >
    Indie Rock
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Rock Gótico')}
    className={`boton-filtro ${generoSeleccionado === 'Rock Gótico' ? 'boton-filtro-activo' : ''}`}
  >
    Rock Gótico
  </button>
  <button 
    onClick={() => setGeneroSeleccionado('Synth Pop')}
    className={`boton-filtro ${generoSeleccionado === 'Synth Pop' ? 'boton-filtro-activo' : ''}`}
  >
    Synth Pop
  </button>
</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productosFiltrados.map(producto => (
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
