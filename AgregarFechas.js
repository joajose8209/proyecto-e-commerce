import fs from 'fs';
import path from 'path';

console.log('AgregarFechas.js esta siendo ejecutado');

//Configuracion
const Ruta_Archivo = path.join('public', 'data', 'productos.json');

/**
 * @returns {string}
 */
function generarFechaAleatoria () {
const hoy = new Date();
const diasAtras = Math.floor(Math.random() * 7);
const fecha = new Date();
fecha.setDate(hoy.getDate() - diasAtras);
return fecha.toISOString();
};
//Logica Principal
try {
const data = fs.readFileSync(Ruta_Archivo, 'utf-8');

let productos = JSON.parse(data);
let productosModificados = 0;

console.log(`Encontrados ${productos.length} productos. Verificando fechas....`)   

const productosActualizados = productos.map(producto => {
if(!producto.hasOwnProperty('fechaAgregado')){
productosModificados++;
return {
...producto,
fechaAgregado: generarFechaAleatoria()
};    
} 
return producto;   
});
if(productosModificados >0) {
fs.writeFileSync(Ruta_Archivo, JSON.stringify(productosActualizados,null, 2 ));
console.log(`Exito se añadieron fechas a ${productosModificados} productos. `);
console.log("Mision completa, datos han viajado en el tiempo");    
} else {
 console.log("No se necesitaron cambios, todos los productos ya tenian su fecha");  
}
} catch (error) {
console.error('Ocurrio un error al procesar el archivo');    
}