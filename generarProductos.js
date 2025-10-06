import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

console.log("🤖 Iniciando el script de actualización de productos (Versión Definitiva)...");

// --- CONFIGURACIÓN ---
const MI_API_KEY = "a10e9aa16bf81c9c2d6b34b6bb19c765";
const RUTA_ARCHIVO = path.join('public', 'data', 'productos.json');
const LIMITE_POR_ARTISTA = 5;

const artistasParaBuscar = [
 "The Strokes", "Pink floyd"
];

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function actualizarProductos() {
  let productosActuales = [];
  try {
    const data = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
    productosActuales = JSON.parse(data);
    console.log(`✅ Se han cargado ${productosActuales.length} productos existentes.`);
  } catch (error) {
    console.log("📝 No se encontró un archivo existente. Se creará uno nuevo.");
  }

  const mapaDeAlbumesExistentes = new Set(
    productosActuales.map(p => `${p.artista.toLowerCase()} - ${p.album.toLowerCase()}`)
  );
  
  let idContador = productosActuales.length > 0 ? Math.max(...productosActuales.map(p => p.id)) + 1 : 1;
  let nuevosAlbumesAñadidos = 0;

  for (const artista of artistasParaBuscar) {
    const artistaParaUrl = encodeURIComponent(artista);
    let generoPrincipal = "Rock";

    try {
      console.log(`\n🔎 Buscando género principal para: ${artista}...`);
      const urlInfoArtista = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artistaParaUrl}&api_key=${MI_API_KEY}&format=json`;
      const respuestaInfoArtista = await fetch(urlInfoArtista);
      const datosInfoArtista = await respuestaInfoArtista.json();

      if (datosInfoArtista.toptags && datosInfoArtista.toptags.tag && datosInfoArtista.toptags.tag.length > 0) {
        const generoApi = datosInfoArtista.toptags.tag[0].name;
        generoPrincipal = generoApi.charAt(0).toUpperCase() + generoApi.slice(1).toLowerCase();
        console.log(` -> Género principal asignado: ${generoPrincipal}`);
      } else {
        console.log(` -> No se encontró género. Se usará "${generoPrincipal}".`);
      }
      
      await delay(50);

      const urlTopAlbums = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistaParaUrl}&api_key=${MI_API_KEY}&limit=${LIMITE_POR_ARTISTA}&format=json`;
      console.log(` -> Buscando (hasta ${LIMITE_POR_ARTISTA}) álbumes para: ${artista}...`);
      
      const respuestaTopAlbums = await fetch(urlTopAlbums);
      const datosTopAlbums = await respuestaTopAlbums.json();
      
      if (datosTopAlbums.topalbums && datosTopAlbums.topalbums.album) {
        for (const album of datosTopAlbums.topalbums.album) {
          const claveAlbum = `${album.artist.name.toLowerCase()} - ${album.name.toLowerCase()}`;
          const tieneImagen = album.image[3] && album.image[3]['#text'];

          if (!mapaDeAlbumesExistentes.has(claveAlbum) && tieneImagen) {
            const nuevoProducto = {
              id: idContador++,
              artista: album.artist.name,
              album: album.name,
              precio: Math.floor(Math.random() * (50000 - 30000 + 1) + 30000),
              imagen: album.image[3]['#text'],
              genero: generoPrincipal,
              // --- ¡MEJORA AÑADIDA AQUÍ! ---
              fechaAgregado: new Date().toISOString() // <-- Asigna la fecha actual
            };
            
            productosActuales.push(nuevoProducto);
            mapaDeAlbumesExistentes.add(claveAlbum);
            nuevosAlbumesAñadidos++;
          }
        }
      }
    } catch (error) {
      console.error(`❌ Hubo un error procesando al artista ${artista}:`, error);
    }
  }

  if (nuevosAlbumesAñadidos > 0) {
    fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(productosActuales, null, 2));
    console.log(`\n🎉 ¡Éxito! Se añadieron ${nuevosAlbumesAñadidos} nuevos álbumes. Total en catálogo: ${productosActuales.length}.`);
  } else if (artistasParaBuscar.length > 0) {
    console.log("\n👍 No se encontraron nuevos álbumes para añadir que no estuvieran ya en el catálogo.");
  } else {
    console.log("\n🤷‍♂️ No se especificaron artistas para buscar. El script no hizo nada.");
  }
}

actualizarProductos();