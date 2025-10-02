import fs from 'fs';

console.log("🧼 Iniciando el script de limpieza de géneros...");

// --- CONFIGURACIÓN ---
const RUTA_ARCHIVO = './public/data/productos.json';

// --- DICCIONARIO DE REGLAS ---
const mapaDeGeneros = {
  // Unificar variaciones de Rock Alternativo
  'alternative rock': 'Rock Alternativo',
  'alternative': 'Rock Alternativo',
  'alternativ rock': 'Rock Alternativo', // Corregir errores de tipeo
  'indie rock': 'Rock Alternativo',
  
  // Unificar variaciones de Rock
  'classic rock': 'Rock',
  'glam rock': 'Rock',
  'art rock': 'Rock',
  'folk rock': 'Rock',
  'hard rock': 'Hard Rock', // Mantener consistencia
  
  // Unificar variaciones de Pop
  'art pop': 'Pop',
  'synth pop': 'Pop',
  
  // Unificar variaciones de Post-Punk
  'post-punk': 'Post-Punk',
  'new wave': 'Post-Punk',
  'gothic rock': 'Post-Punk', // Agrupar géneros similares
  
  // Eliminar años y décadas (se detectarán como no válidos)
  '70s': null,
  '80s': null,
  '1980': null,
  '1987': null,
  '1974': null,
  '2016': null,
  '2008': null,
  '1991': null,
  '2003': null,
  '2015': null,
  
  // Estandarizar capitalización (se hará automáticamente, pero se puede forza)
  'rock': 'Rock',
  'pop': 'Pop',
  'hard rock': 'Hard Rock',
  'shoegaze': 'Shoegaze',
  'britpop': 'Britpop'
};

function limpiarYCapitalizar(genero) {
const generoEnMinusculas = genero.trim().toLowerCase();
    
// 1. Si es un número (como "1987"), lo descarta.
if (/^\d+s?$/.test(generoEnMinusculas)) {
return null; // Devolver null para marcarlo como inválido
}
    
// 2. Buscamos en nuestro mapa de reglas.
if (mapaDeGeneros.hasOwnProperty(generoEnMinusculas)) {
return mapaDeGeneros[generoEnMinusculas]; // Usamos la corrección del mapa
}

 // 3. Si no hay regla, simplemente lo capitaliza correctamente.
// Esto convierte "new wave" en "New Wave", por ejemplo.
return genero.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()).join(' ');
}


try {
const data = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
let productos = JSON.parse(data);
let generosModificados = 0;
    
// Recorremos cada producto y limpiamos su género
const productosLimpios = productos.map(producto => {
const generoOriginal = producto.genero;
let generoLimpio = limpiarYCapitalizar(generoOriginal);
        
// Si la función de limpieza devolvió null (ej. era un año),
// lo deja como 'Rock' por defecto.
if (generoLimpio === null) {
console.log(` ⚠️ Género inválido "${generoOriginal}" en "${producto.album}". Se asigna "Rock".`);
generoLimpio = 'Rock';
}
        
if (generoOriginal !== generoLimpio) {
generosModificados++;
console.log(` -> Corrigiendo "${generoOriginal}" a "${generoLimpio}" para el álbum: ${producto.album}`);
}
        
// Devuelve el producto con el género actualizado
return { ...producto, genero: generoLimpio };
});
    
if (generosModificados > 0) {
fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(productosLimpios, null, 2));
console.log(`\n🎉 ¡Éxito! Se limpiaron y estandarizaron ${generosModificados} géneros.`);
} else {
console.log("\n👍 No se necesitaron correcciones. Los géneros ya están limpios.");
}
    
} catch (error) {
console.error("❌ Ocurrió un error al procesar el archivo:", error);
}