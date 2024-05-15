// Obtengo los Id del menu desplegable movil y los botones para abrir y cerrar el menu.
const menuLinks = document.getElementById('menuLinks');
const botonMenu = document.getElementById('botonMenu');
const botonCerrar = document.getElementById('botonCerrar');
 
botonMenu?.addEventListener('click', () => {  // Escucha los eventos click para ocultar, mostrar y animar los botones del menu de true a false.
    menuLinks?.classList.toggle('opacity-0'); 
    menuLinks?.classList.toggle('pointer-events-none');  
    botonCerrar?.classList.toggle('hidden');
    botonMenu?.classList.toggle('hidden'); 
    botonMenu?.classList.add('animate-heartbeat')
    botonCerrar?.classList.add('animate-heartbeat')
  });
  
botonCerrar?.addEventListener('click', () => {  // Escucha los eventos click para mostrar, ocultar y animar los botones del menu de false a true.
    menuLinks?.classList.toggle('opacity-0'); 
    menuLinks?.classList.toggle('pointer-events-none')
    botonCerrar?.classList.toggle('hidden');
    botonMenu?.classList.toggle('hidden'); 
    botonCerrar?.classList.add('animate-heartbeat')
    botonMenu?.classList.add('animate-heartbeat')
  }); 