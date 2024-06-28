
const formRestablecer = document.getElementById('restablecerForm');

formRestablecer.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3001/restablecer-contrasena', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      alert('Restablecimiento de contraseña exitoso!');

    } else { 
      await response.text();
      alert('Ingresa un correo electrónico válido.');
    }
    
  } catch (err) {  
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');

  } finally {
    formRestablecer.reset();
  }
});