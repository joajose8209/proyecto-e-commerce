import fs from 'fs';
import path from 'path';

console.log("🧼 Iniciando el script de limpieza de géneros (Versión 2.0)...");

// --- CONFIGURACIÓN ---
const RUTA_ARCHIVO = path.join('public', 'data', 'productos.json');

// 1. 👇 MAPA DE GÉNEROS MEJORADO Y COMPLETO
//    Ahora incluye todas las variaciones de tu archivo JSON, siempre en minúsculas.
const GENERO_MAP = {
  "Heavy Metal": ["heavy metal", "metal"],
  "Hard Rock": ["hard rock"],
  "Rock Progresivo": ["rock progresivo", "progressive rock", "prog rock"],
  "Punk Rock": ["punk rock", "punk"],
  "Indie Rock": ["indie rock", "indie", "alternative rock", "rock alternativo"],
  "Pop Rock": ["pop rock"],
  "Blues Rock": ["blues rock"],
  // ... puedes seguir añadiendo reglas aquí ...
};

// 2. 👇 FUNCIÓN MEJORADA PARA CAPITALIZAR CADA PALABRA (Title Case)
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

// 3. 👇 FUNCIÓN DE NORMALIZACIÓN ACTUALIZADA
function normalizarGenero(generoApi) {
  if (typeof generoApi !== 'string') return "Rock"; // Valor por defecto si el género no es un string

  const generoEnMinusculas = generoApi.toLowerCase().trim(); // Usamos .trim() para quitar espacios extra

  for (const generoOficial in GENERO_MAP) {
    if (GENERO_MAP[generoOficial].includes(generoEnMinusculas)) {
      return generoOficial; // Devuelve el nombre oficial del mapa
    }
  }

  // Si no se encuentra en el mapa, usamos nuestra nueva función `toTitleCase`
  return toTitleCase(generoApi);
}

// --- FUNCIÓN PRINCIPAL (SIN CAMBIOS) ---
function limpiarArchivo() {
  try {
    const data = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
    let productos = JSON.parse(data);
    console.log(`✅ Archivo leído. Se encontraron ${productos.length} productos.`);

    let generosCambiados = 0;

    const productosLimpios = productos.map(producto => {
      const generoOriginal = producto.genero;
      const generoNormalizado = normalizarGenero(generoOriginal);

      if (generoOriginal !== generoNormalizado) {
        generosCambiados++;
        console.log(`  - Cambiando "${generoOriginal}" por "${generoNormalizado}" en el álbum "${producto.album}"`);
      }

      return {
        ...producto,
        genero: generoNormalizado
      };
    });

    if (generosCambiados > 0) {
      fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(productosLimpios, null, 2));
      console.log(`\n🎉 ¡Limpieza completada! Se corrigieron ${generosCambiados} géneros.`);
      console.log(`💾 El archivo "productos.json" ha sido actualizado.`);
    } else {
      console.log("\n👍 ¡No se necesitaron cambios! Tu archivo de géneros ya estaba limpio.");
    }

  } catch (error) {
    console.error("❌ Ocurrió un error durante el proceso de limpieza:", error);
  }
}

limpiarArchivo();