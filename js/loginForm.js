
const formLogin = document.getElementById('loginForm');

  formLogin.addEventListener('submit', async (e) => { 
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    
    if (response.ok) {
      alert('Inicio de sesion exitoso!');
      alert('Proyecto en desarrollo...');
      window.location.reload();
      
    } else if (response.status === 403) {
      await response.text();
      alert('Ingresa una contraseña válida!');

    } else {
      await response.text();
      alert('Correo electrónico invalido!');
    }

  } catch (err) { 
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');

  } finally { 
    formLogin.reset();
  }
});