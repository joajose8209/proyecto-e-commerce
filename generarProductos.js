import fetch from 'node-fetch';
import fs from 'fs';

console.log("🤖 Iniciando el script de actualización de productos...");

// --- CONFIGURACIÓN ---
const MI_API_KEY = "a10e9aa16bf81c9c2d6b34b6bb19c765";
const RUTA_ARCHIVO = './public/data/productos.json'; // La ruta a mi archivo actual

// Lista de artistas de los que quiero buscar y añadir más álbumes.
const artistasParaBuscar = [
  "The Cure", "The Smiths", "David Bowie", "Radiohead",
  "Joy Division", "Pixies", "Blur", "My Bloody Valentine", "Ac Dc" 
];

// --- FUNCIÓN PRINCIPAL ---
async function actualizarProductos() {
  // 1. Lectura del ARCHIVO EXISTENTE
  let productosActuales = [];
  try {
    const data = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
    productosActuales = JSON.parse(data);
    console.log(`✅ Se han cargado ${productosActuales.length} productos existentes.`);
  } catch (error) {
    console.log("📝 No se encontró un archivo existente. Se creará uno nuevo.");
  }

  // Creacion de  un "mapa" para buscar duplicados fácilmente y eficientemente
  const mapaDeAlbumesExistentes = new Set(
    productosActuales.map(p => `${p.artista.toLowerCase()} - ${p.album.toLowerCase()}`)
  );
  
  let idContador = productosActuales.length > 0 ? Math.max(...productosActuales.map(p => p.id)) + 1 : 1;
  let nuevosAlbumesAñadidos = 0;

  // 2. BUSQUEDA DE NUEVOS ÁLBUMES EN LA API
  for (const artista of artistasParaBuscar) {
    const artistaParaUrl = artista.replace(/ /g, "+");
    const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistaParaUrl}&api_key=${MI_API_KEY}&format=json`;
    
    try {
      console.log(` -> Buscando álbumes para: ${artista}...`);
      const respuestaAPI = await fetch(url);
      const datos = await respuestaAPI.json();
      
      if (datos.topalbums && datos.topalbums.album) {
        for (const album of datos.topalbums.album) {
          const claveAlbum = `${album.artist.name.toLowerCase()} - ${album.name.toLowerCase()}`;
          const tieneImagen = album.image[3] && album.image[3]['#text'];

          // 3. AGREGA SOLO SI NO ES DUPLICADO Y TIENE IMAGEN
          if (!mapaDeAlbumesExistentes.has(claveAlbum) && tieneImagen) {
            const nuevoProducto = {
              id: idContador++,
              artista: album.artist.name,
              album: album.name,
              precio: Math.floor(Math.random() * (50000 - 30000 + 1) + 30000),
              imagen: album.image[3]['#text'], // <-- URL de la imagen automática
              genero: "Por definir"
            };
            
            productosActuales.push(nuevoProducto); // Añadir a la lista
            mapaDeAlbumesExistentes.add(claveAlbum); // Añade al mapa para no repetirlo en esta misma ejecución
            nuevosAlbumesAñadidos++;
          }
        }
      }
    } catch (error) {
      console.error(`Hubo un error con el artista ${artista}:`, error);
    }
  }

  // 4. GUARDAR EL ARCHIVO ACTUALIZADO
  if (nuevosAlbumesAñadidos > 0) {
    fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(productosActuales, null, 2));
    console.log(`\n🎉 ¡Éxito! Se añadieron ${nuevosAlbumesAñadidos} nuevos álbumes. Total: ${productosActuales.length} productos.`);
  } else {
    console.log("\n👍 No se encontraron nuevos álbumes para añadir. Tu archivo ya está actualizado.");
  }
}

actualizarProductos();