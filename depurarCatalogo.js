import fs from 'fs';
import path from 'path';

console.log("🚀 Iniciando el script para depurar el catálogo...");

// --- CONFIGURACIÓN ---
const RUTA_ARCHIVO_ENTRADA = path.join('public', 'data', 'productos.json');
const RUTA_ARCHIVO_SALIDA = path.join('public', 'data', 'productos-depurado.json');
const LIMITE_POR_ARTISTA = 5;

try {
  // 1. Leer el catálogo actual
  const data = fs.readFileSync(RUTA_ARCHIVO_ENTRADA, 'utf8');
  const productos = JSON.parse(data);
  console.log(`✅ Catálogo leído con ${productos.length} productos.`);

  // 2. Determinar el género principal de cada artista
  const conteoGenerosPorArtista = {};
  for (const producto of productos) {
    const { artista, genero } = producto;
    if (!conteoGenerosPorArtista[artista]) {
      conteoGenerosPorArtista[artista] = {};
    }
    conteoGenerosPorArtista[artista][genero] = (conteoGenerosPorArtista[artista][genero] || 0) + 1;
  }

  const generoPrincipalPorArtista = {};
  for (const artista in conteoGenerosPorArtista) {
    const generos = conteoGenerosPorArtista[artista];
    // Encuentra el género con el recuento más alto
    const generoPrincipal = Object.keys(generos).reduce((a, b) => generos[a] > generos[b] ? a : b);
    generoPrincipalPorArtista[artista] = generoPrincipal;
  }
  console.log("✅ Género principal determinado para cada artista.");

  // 3. Agrupar todos los álbumes por artista
  const productosPorArtista = {};
  for (const producto of productos) {
    if (!productosPorArtista[producto.artista]) {
      productosPorArtista[producto.artista] = [];
    }
    productosPorArtista[producto.artista].push(producto);
  }

  // 4. Construir el nuevo catálogo depurado
  const catalogoDepurado = [];
  for (const artista in productosPorArtista) {
    const albumes = productosPorArtista[artista];
    const generoUnificado = generoPrincipalPorArtista[artista];
    
    // Limitar a los primeros 5 álbumes
    const albumesLimitados = albumes.slice(0, LIMITE_POR_ARTISTA);

    for (const album of albumesLimitados) {
      catalogoDepurado.push({
        ...album,
        genero: generoUnificado // Aplicar el género unificado
      });
    }
  }

  console.log(`✨ Catálogo depurado. Total de artistas: ${Object.keys(productosPorArtista).length}. Total de productos: ${catalogoDepurado.length}.`);

  // 5. Guardar el nuevo catálogo en un archivo separado
  fs.writeFileSync(RUTA_ARCHIVO_SALIDA, JSON.stringify(catalogoDepurado, null, 2));
  console.log(`🎉 ¡Éxito! El nuevo catálogo ha sido guardado en: ${RUTA_ARCHIVO_SALIDA}`);
  console.log("Puedes revisar el archivo y, si estás conforme, renombrarlo a 'productos.json' para usarlo en tu aplicación.");

} catch (error) {
  console.error("❌ Ocurrió un error durante el proceso:", error);
}