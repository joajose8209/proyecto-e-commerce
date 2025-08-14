const obtenerProductos = async () => {
  try {
    const response = await fetch('/data/productos.json');
    console.log('Código de estado de la respuesta:', response.status);
    if (!response.ok) {
      throw new Error('Error al obtener los datos.');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Hubo un problema con la función fetch:', error);
    return [];
  }
};

export { obtenerProductos };