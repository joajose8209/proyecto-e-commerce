export const getImageUrl = (producto) => {
const placeholder = '/images/default-placeholder.png'; // Una imagen de respaldo

// Si no hay producto o no tiene la propiedad 'imagen', devuelve el placeholder.
if (!producto || !producto.imagen) {
return placeholder;
}

const { imagen } = producto;

// Verificar que 'imagen' sea un string. Si no, no se puede procesar.
if (typeof imagen !== 'string' || imagen.trim() === '') {
return placeholder;
}

// --- LÓGICA INTELIGENTE ---

if (imagen.startsWith('http')) {
// CASO 1: Es una URL completa de la API. Se la usa  tal cual.
return imagen;
} else {
// CASO 2: Es un nombre de archivo local.Construccion de la ruta completa.
return `/images/${imagen}`;
}
};