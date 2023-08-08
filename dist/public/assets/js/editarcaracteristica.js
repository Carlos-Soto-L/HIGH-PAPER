const eformCategoria = document.getElementById('editcaracteristicaform');

eformCategoria.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que se envíe la solicitud de forma convencional
  const formData = new FormData(eformCategoria);
  const data = {};

  // Agregar valores de formulario a objeto JSON
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  try {
    const response = await fetch("/admin/editarcaracteristica", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const datos = await response.json();
    if (datos.status == 0) {
        alertify.notify(datos.mensaje, 'error', 5, function(){  /*console.log('dismissed');*/ });
    }else if (datos.status == 1) {
      alertify.notify(datos.mensaje, 'success', 5, function(){  /*console.log('dismissed');*/ });
    }else{
        console.log(error)
    }
    // Haz algo con los datos recibidos del servidor, como redirigir a otra página
  } catch (error) {
    console.error(error);
  }
});