import React, { useState, useEffect } from 'react';
//importacion para Sprint 4 dia Miercoles useParams
import { useParams } from 'react-router-dom';
import { obtenerProductos } from '../services/productosService'; 

function ProductDetailPage() {
 //devuelve un objeto con los parametros de la URL.
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

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