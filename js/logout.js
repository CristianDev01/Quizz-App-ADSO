
const cerrarSesion = document.getElementById('logout');

cerrarSesion.addEventListener('click', async () => { 

  try {
    const response = await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include'
    })
        
    if (response.status === 204) {
    return window.location.reload()
    }

  } catch (err ) {
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.')
  }
});