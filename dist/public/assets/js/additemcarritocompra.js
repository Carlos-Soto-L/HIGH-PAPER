const form001 = document.getElementById('addcarritoform001');


form001.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que se envíe la solicitud de forma convencional
  const formData = new FormData(form001);
  const data = {};

  // Agregar valores de formulario a objeto JSON
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  console.log(JSON.stringify(data))
  try {
    const response = await fetch("/user/agregaritemcarrito", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const datos = await response.json();
    if (datos.status == 0) {
        alertify.notify(datos.mensaje, 'error', 5, function(){  console.log('dismissed'); });
    }else if (datos.status == 1) {
        alertify.alert('Correcto', datos.mensaje, function(){  });
    }else{
        console.log(error)
    }
    console.log(datos.status);
    // Haz algo con los datos recibidos del servidor, como redirigir a otra página
  } catch (error) {
    console.error(error);
  }
});