import React, {createContext, useState, useContext, useEffect}  from "react";

export const ThemeContext = createContext();

export const useTheme = ()=> {
return useContext(ThemeContext);
};  

export const ThemeProvider = ({children}) => {
const [theme, setTheme] = useState(() => {
 const temaGuardado = localStorage.getItem('theme');
return temaGuardado ? temaGuardado : 'light';
});

useEffect(() => {
localStorage.setItem('theme', theme );    
},[theme]);

const toggleTheme = () => {
setTheme(prevTheme =>(prevTheme === 'light' ? 'dark'  : 'light'));
};
const value = {theme, toggleTheme };

return (
<ThemeContext.Provider value={value}>
{children}
</ThemeContext.Provider>  
);
};




