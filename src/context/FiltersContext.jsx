import { createContext, useState } from "react";
export const FiltersContext = createContext();
export function FiltersProvider({ children }) {
const [busqueda, setBusqueda]  = useState('');
const [filtroGenero, setFiltroGenero]  = useState('todos');
const [criterioOrden, setCriterioOrden]  = useState('predeterminado');
return (
<FiltersContext.Provider
value={{
 busqueda,
 setBusqueda,
filtroGenero,
setFiltroGenero,
criterioOrden,
setCriterioOrden,   
}}    
>
	{children}
</FiltersContext.Provider>
);
}