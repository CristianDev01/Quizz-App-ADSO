
const formLogin = document.getElementById('loginForm');  // Obtengo el id del formulario Login.

formLogin.addEventListener('submit', async (e) => {  // Escucha el evento submit del formulario y evito que se recargue la pagina por defecto.
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);  // Obtiene los datos del formulario y los convierte en un objeto.

  try {
    const response = await fetch('http://localhost:3001/login', {  // Función para hacer la solicitud a la APi desde el cliente al servidor.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)  // Convierte el objeto en formato Json.
    })
    
    if (response.ok) {  // Si la respuesta es de status 200 Ok significa que el login fue exitoso y muestra una alert. (alert provisional.)
      alert('Inicio de sesion exitoso!');
      alert('Proyecto en desarrollo...');

    } else if (response.status === 403) {  // Captura el status code 403 cuando el correo existe en db y es valido, pero la contraseña es invalida.
      await response.text();
      alert('Ingresa una contraseña válida!');

    } else {  // Si el correo ingresado no existe en db devuelve una alert de error al cliente.
      await response.text();
      alert('Usuario y/o contraseña inválida!');
    }

  } catch (err) {  // Captura errores en la solicitud (servidor o APi).
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');

  } finally {  // Al finalizar cualquier interación del formulario resetea los campos.
    formLogin.reset();
  }
});