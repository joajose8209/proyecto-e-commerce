import React, { useState, useEffect } from 'react';
//importacion para Sprint 4 dia Miercoles useParams
import { useParams } from 'react-router-dom';
//Sprint 6 comento la lista completa vendra por props.
//import { obtenerProductos } from '../services/productosService'; 

function ProductDetailPage({productos}) {
 //devuelve un objeto con los parametros de la URL.
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relacionados, setRelacionados] = useState([]);

  //Sprint 6 UseEffect, se encarga de encontrar el producto principal.
  useEffect(() =>{
  //Si la lista principal de productos ya esta disponible.
  if(productos.length > 0) {
  setLoading(true);//Se inicia la  carga
  const productoEncontrado = productos.find((p) => p.id == id);
  setProducto(productoEncontrado);
  setLoading(false); //Aqui termina la  carga.
}
},[id, productos]);// se ejecuta si cambia el ID en la URL o bien si llega la lista de productos.

//Sprint 6 segundo UseEffect que se va a encargar de encontrar los productos relacionados.
useEffect(()=>{
// Sprint 6 si ya he encontrado el producto y esta la lista completa....
if(producto && productos.length > 0){
const productosFiltrados = productos.filter(p => p.genero === producto.genero && p.id !== producto.id);
setRelacionados(productosFiltrados.slice(0, 4,));
};
}, [producto, productos]);//se va a ejecutar si el prod. principal cambia.

  /* Sprint 6 comento,  ya no utilizo funcion asincronica, es mas eficiente la mejora solo va a recibir los datos por props
  del componente padre App.jsx.
  useEffect(() => {
   // Funcion asincrona para cargar el producto 
    const cargarProducto = async () => {
      setLoading(true);// aqui empieza la carga
      try {
        const productos = await obtenerProductos();
        // uso productos.find para encontrar el producto cuyo id coincida con el parametro de la URL
        const productoEncontrado = productos.find((p) => p.id == id);
        setProducto(productoEncontrado);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
      setLoading(false);// aqui termina la carga
    };

    cargarProducto();
  }, [id]); */

  // Renderizado condicional mientras carga
  if (loading) {
    return <p>Cargando producto...</p>;
  }

  // Renderizado si el producto no se encontró
  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  // Renderizado cuando el producto ya se cargó
  return (
    <div className="detalle-container">
      <div className="detalle-img">
        <img src={`/img/${producto.imagen}`} alt={producto.album} />
      </div>
      <div className="detalle-info">
        <h2>{producto.album}</h2>
        <h3>{producto.artista}</h3>
        <p className="detalle-precio">${producto.precio}</p>
        <p><strong>Género:</strong> {producto.genero}</p>
        <button className="detalle-boton-comprar">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;