//Contiene funcion que se conecta con el archivo productos.json y maneja la respuesta.
const obtenerProductos = async () => {
  try {
    const response = await fetch ('/data/productos.json');
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Hubo un problema con la operación fetch:', error);
    return [];
  }
};

export { obtenerProductos };