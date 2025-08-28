import React from 'react'; 
function Filters({ terminoBusqueda, setTerminoBusqueda, generoSeleccionado, setGeneroSeleccionado, generos = [] }) {
  return (
    // CORRECCIÓN: Tuve un problema porque no añadi un Fragmento <> para envolver todo en un solo elemento raíz
    <>
        
      <div className="search-container">
        <input
          className='search-input'
          type="text"
          placeholder='Buscar por artista o album...'
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
      </div>

      {/* Agrego botones para filtrar por genero 
      <div>
        <button
          onClick={() => setGeneroSeleccionado('Todos')}
          className={`boton-filtro ${generoSeleccionado === 'Todos' ? 'boton-filtro-activo' : ''}`}
        >
          Todos
        </button>
        
        <button
          onClick={() => setGeneroSeleccionado('Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Rock Progresivo')}
          className={`boton-filtro ${generoSeleccionado === 'Rock Progresivo' ? 'boton-filtro-activo' : ''}`}
        >
          Rock Progresivo
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Hard Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Hard Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Hard Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Grunge')}
          className={`boton-filtro ${generoSeleccionado === 'Grunge' ? 'boton-filtro-activo' : ''}`}
        >
          Grunge
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Pop')}
          className={`boton-filtro ${generoSeleccionado === 'Pop' ? 'boton-filtro-activo' : ''}`}
        >
          Pop
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Heavy Metal')}
          className={`boton-filtro ${generoSeleccionado === 'Heavy Metal' ? 'boton-filtro-activo' : ''}`}
        >
          Heavy Metal
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Glam Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Glam Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Glam Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Pop Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Pop Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Pop Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Blues Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Blues Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Blues Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Reggae')}
          className={`boton-filtro ${generoSeleccionado === 'Reggae' ? 'boton-filtro-activo' : ''}`}
        >
          Reggae
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('New Wave')}
          className={`boton-filtro ${generoSeleccionado === 'New Wave' ? 'boton-filtro-activo' : ''}`}
        >
          New Wave
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Punk Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Punk Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Punk Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Rock Alternativo')}
          className={`boton-filtro ${generoSeleccionado === 'Rock Alternativo' ? 'boton-filtro-activo' : ''}`}
        >
          Rock Alternativo
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Indie Rock')}
          className={`boton-filtro ${generoSeleccionado === 'Indie Rock' ? 'boton-filtro-activo' : ''}`}
        >
          Indie Rock
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Rock Gótico')}
          className={`boton-filtro ${generoSeleccionado === 'Rock Gótico' ? 'boton-filtro-activo' : ''}`}
        >
          Rock Gótico
        </button>
        <button 
          onClick={() => setGeneroSeleccionado('Synth Pop')}
          className={`boton-filtro ${generoSeleccionado === 'Synth Pop' ? 'boton-filtro-activo' : ''}`}
        >
          Synth Pop
        </button> 
      </div> */}
      {/* 2. voy a reemplazar  los botones hardcodeados por un .map() dinámico */}
       <div className='filter-container' style={{ padding: '20px' }}>
        {generos.map((genero) => (
          <button
            key={genero} 
            onClick={() => setGeneroSeleccionado(genero)}
            className={`boton-filtro ${generoSeleccionado === genero ? 'boton-filtro-activo' : ''}`}
          >
            {genero}
          </button>
        ))}
      </div>
    </>
  );
}

export default Filters;