
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productosService';
import ProductCard from '../components/ProductCard';

function App() {
  const [productos, setProductos] = useState([]);
 //Estado carrito
  const [carrito, setCarrito] = useState([]);
  //Agregar productos a esa lista
  const agregarAlCarrito = (producto) => {
  setCarrito(prevCarrito => [...prevCarrito, producto]); 
  }



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
          <ProductCard key={producto.id} 
          producto={producto}
        // pasar la funcion como un prop
       agregarAlCarrito={agregarAlCarrito} 
           />
        ))}
      </div>
    </div>
  );
}

export default App;
