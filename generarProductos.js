import fetch from 'node-fetch';
import fs from 'fs';

console.log("🤖 Iniciando el script de actualización de productos (Versión con Límite)...");

const MI_API_KEY = "a10e9aa16bf81c9c2d6b34b6bb19c765";
const RUTA_ARCHIVO = './public/data/productos.json';

const LIMITE_POR_ARTISTA = 5; 

const artistasParaBuscar = [
"The Cure", "The Smiths", "David Bowie", "Radiohead",
"Joy Division", "Pixies", "Blur", "My Bloody Valentine", "AC/DC"
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
const artistaParaUrl = artista.replace(/ /g, "+");
    
const urlTopAlbums = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artistaParaUrl}&api_key=${MI_API_KEY}&limit=${LIMITE_POR_ARTISTA}&format=json`;
    
try {
console.log(` -> Buscando (hasta ${LIMITE_POR_ARTISTA}) álbumes para: ${artista}...`); // Mensaje actualizado
const respuestaTopAlbums = await fetch(urlTopAlbums);
const datosTopAlbums = await respuestaTopAlbums.json();
      
if (datosTopAlbums.topalbums && datosTopAlbums.topalbums.album) {
for (const album of datosTopAlbums.topalbums.album) {
const claveAlbum = `${album.artist.name.toLowerCase()} - ${album.name.toLowerCase()}`;
const tieneImagen = album.image[3] && album.image[3]['#text'];

if (!mapaDeAlbumesExistentes.has(claveAlbum) && tieneImagen) {
            
await delay(50); 
            
let generoPrincipal = "Rock";
try {
const albumParaUrl = encodeURIComponent(album.name);
const artistaInfoParaUrl = encodeURIComponent(album.artist.name);
const urlAlbumInfo = `http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=${MI_API_KEY}&artist=${artistaInfoParaUrl}&album=${albumParaUrl}&format=json`;
              
const respuestaAlbumInfo = await fetch(urlAlbumInfo);
const datosAlbumInfo = await respuestaAlbumInfo.json();

if (datosAlbumInfo.album && datosAlbumInfo.album.tags && datosAlbumInfo.album.tags.tag.length > 0) {
let generoApi = datosAlbumInfo.album.tags.tag[0].name;
generoPrincipal = generoApi.charAt(0).toUpperCase() + generoApi.slice(1);
}
} catch (error) {
console.log(`    (No se pudo obtener el género para ${album.name}, se usará el predeterminado)`);
}
            
const nuevoProducto = {
id: idContador++,
artista: album.artist.name,
album: album.name,
precio: Math.floor(Math.random() * (50000 - 30000 + 1) + 30000),
imagen: album.image[3]['#text'],
genero: generoPrincipal
};
            
productosActuales.push(nuevoProducto);
mapaDeAlbumesExistentes.add(claveAlbum);
nuevosAlbumesAñadidos++;
}
}
}
} catch (error) {
console.error(`Hubo un error con el artista ${artista}:`, error);
}
}

if (nuevosAlbumesAñadidos > 0) {
fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(productosActuales, null, 2));
console.log(`\n🎉 ¡Éxito! Se añadieron ${nuevosAlbumesAñadidos} nuevos álbumes. Total: ${productosActuales.length} productos.`);
} else {
console.log("\n👍 No se encontraron nuevos álbumes para añadir. Tu archivo ya está actualizado.");
}
}

actualizarProductos();