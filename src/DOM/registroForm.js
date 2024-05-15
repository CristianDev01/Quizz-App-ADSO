
const formregistro = document.getElementById('registroForm');  // Obtengo el id del formulario Registro.

formregistro.addEventListener('submit', async (e) => {  // Escucha el evento submit del formulario y evito que se recargue la pagina por defecto.
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);  // Obtiene los datos del formulario y los convierte en un objeto.

  try {
    const response = await fetch('http://localhost:3001/registro', {  // Función para hacer la solicitud a la APi desde el cliente al servidor.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)  // Convierte el objeto en formato Json.
    })
    
    if (response.ok) {  // Si la respuesta es status Ok 201, significa que se realizó el registo y se incluye en la respuesta el token jwt firmado.
      alert('Registro exitoso!');
      alert('Proyecto en desarrollo...');

    } else if (response.status === 403) {  // Capturo el status 403 para indicar que el correo ingresado ya está registrado e inicie sesión.
      await response.text();
      alert('El usuario ya existe. Por favor, inicia sesión!');

    } else if (response.status === 409) {  // Capturo el status 409 para indicar que el nickname ingresado ya está en uso.
      await response.text();
      alert('Lo sentimos, el nickname que has elegido ya está en uso. Por favor, elige otro apodo!');
    }

  } catch (err) {  // Captura errores en la solicitud (servidor o APi).
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');

  } finally {  // Al finalizar cualquier interación del formulario resetea los campos.
    formregistro.reset();
  }
});