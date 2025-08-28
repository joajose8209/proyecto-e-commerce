import ProductCard from './ProductCard'; 
function ProductList ({productos, agregarAlCarrito}) {
if (productos.length === 0) {
return <p>No se encontraron  vinilos que coincidan con tu busqueda</p>
}
return (
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {productos.map(producto => (
          <ProductCard 
            key={producto.id} 
            producto={producto}
            agregarAlCarrito={agregarAlCarrito} 
          />
        ))}
      </div>    
);    
}
 export default ProductList;