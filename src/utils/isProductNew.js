export const isProductNew = (fechaAgregado) => {
if (!fechaAgregado) return false;    
const fechaProducto = new Date(fechaAgregado);
const hoy = new Date();
const diferenciaTiempo = hoy.getTime() - fechaProducto.getTime();
const diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
return diferenciaDias <= 7;
};