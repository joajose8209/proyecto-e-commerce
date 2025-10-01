export const getImageUrl = (producto) => {
  const placeholder = '/images/default-placeholder.png'; // Una imagen de respaldo

  // Si no hay producto o no tiene la propiedad 'imagen', devolvemos el placeholder.
  if (!producto || !producto.imagen) {
    return placeholder;
  }

  const { imagen } = producto;

  // Verificamos que 'imagen' sea un string. Si no, no podemos procesarlo.
  if (typeof imagen !== 'string' || imagen.trim() === '') {
    return placeholder;
  }

  // --- LÓGICA INTELIGENTE ---

  if (imagen.startsWith('http')) {
    // CASO 1: Es una URL completa de la API. La usamos tal cual.
    return imagen;
  } else {
    // CASO 2: Es un nombre de archivo local. Le construimos la ruta completa.
    return `/images/${imagen}`;
  }
};