const elemento = document.getElementById('nickname')
const elemento2 = document.getElementById('!')

  try {
    const response = await fetch('http://localhost:3001/admin', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json(); 
      elemento.classList.remove('invisible')
      elemento2.classList.remove('invisible')
      elemento.textContent = data.nickname
      
    } else {
      elemento.classList.remove('invisible')
      elemento2.classList.remove('invisible')
    }
    
  } catch (err) { 
    console.error('Error en el servidor', err);
    alert('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.'); 
  }