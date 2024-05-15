
const formRestablecer = document.getElementById('restablecerForm');  // Obtengo el id del formulario Restablecer contraseña.

formRestablecer.addEventListener('submit', async (e) => {  // Escucha el evento submit del formulario y evito que se recargue la pagina por defecto.
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);  // Obtiene los datos del formulario y los convierte en un objeto.

  try {
    const response = await fetch('http://localhost:3001/restablecer-contrasena', {  // Función para hacer la solicitud a la APi desde el cliente al servidor.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)  // Convierte el objeto en formato Json.
    })

    if (response.ok) {  // Si la respuesta es Ok status 200 significa que el correo ingresado existe en db y se hace el manejo para el restablecimiento de la contraseña.
      // Respuesta exitosa
      alert('Restablecimiento de contraseña exitoso!');

    } else {  // Capturo otro tipo de status (401), indica que el correo no es valido o que no existe en db.
      // Respuesta con error
      await response.text();
      alert('Ingresa un correo electrónico válido.');
    }
    
  } catch (err) {  
    console.error('Error en el servidor', err);  // Captura errores en la solicitud (servidor o APi).
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');

  } finally {
    formRestablecer.reset();  // Al finalizar cualquier interación del formulario resetea los campos.
  }
});