
const menuLinks = document.getElementById('menuLinks');
const botonMenu = document.getElementById('botonMenu');
const botonCerrar = document.getElementById('botonCerrar');
 
botonMenu.addEventListener('click', () => {
    menuLinks.classList.toggle('opacity-0'); 
    menuLinks.classList.toggle('pointer-events-none');  
    botonCerrar.classList.toggle('hidden');
    botonMenu.classList.toggle('hidden'); 
    botonMenu.classList.add('animate-heartbeat')
    botonCerrar.classList.add('animate-heartbeat')
  });
  
botonCerrar.addEventListener('click', () => {
    menuLinks.classList.toggle('opacity-0'); 
    menuLinks.classList.toggle('pointer-events-none')
    botonCerrar.classList.toggle('hidden');
    botonMenu.classList.toggle('hidden'); 
    botonCerrar.classList.add('animate-heartbeat')
    botonMenu.classList.add('animate-heartbeat')
  }); 