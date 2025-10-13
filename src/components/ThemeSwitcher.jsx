import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
const {theme, toggleTheme} = useTheme();

return (
<button
onClick={toggleTheme}
style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer'}}
>
Cambiar a Tema {theme === 'light' ? 'Oscuro' : 'Claro'}    
</button>    
);
};

export default ThemeSwitcher;
