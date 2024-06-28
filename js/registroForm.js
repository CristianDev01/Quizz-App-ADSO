
const formRegistro = document.getElementById('registroForm');

  formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3001/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    
    if (response.ok) {
      alert('Registro exitoso!');
      alert('Proyecto en desarrollo...');
      window.location.reload();

    } else if (response.status === 403) {
      await response.text();
      alert('El usuario ya existe. Por favor, inicia sesión!');

    } else if (response.status === 409) {
      await response.text();
      alert('Lo sentimos, el nickname que has elegido ya está en uso. Por favor, elige otro apodo!');
    }

  } catch (err) {
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');

  } finally {
    formRegistro.reset();
  }
});