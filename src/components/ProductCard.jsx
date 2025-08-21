//Componente que muestra info de un solo producto, tarjeta visual que muestra los datos del vinilo, plantilla.
const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', width: '200px' }}>
      <img src={`/img/${producto.imagen}`} alt={producto.album} style={{ width: '100%', height: 'auto' }} />
      <h3>{producto.album}</h3>
      <p>Artista: {producto.artista}</p>
      <p>Precio: ${producto.precio}</p>
       {/* Aqui se agrega un comentario para el boton de agregar al carrito */}   
      <button onClick={()=>agregarAlCarrito(producto)}>
      Agregar al Carrito
      </button>
    
    </div>
  );
};

export default ProductCard;