import { limpiarFormulario } from './utils.js';

new MultiSelectTag('aCategorias')  // id

const formProduct = document.getElementById('registroProductsform');

formProduct.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que se envíe la solicitud de forma convencional
  const formData = new FormData(formProduct);
    // Obtener archivos de entrada de imagen

  try {
    const response = await fetch("/admin/crearproducto", {
      method: "POST",
      body: formData
    });
    const datos = await response.json();
    if (datos.status == 0) {
        alertify.notify(datos.mensaje, 'error', 5, function(){  console.log('dismissed'); });
    }else if (datos.status == 1) {
      limpiarFormulario('registroProductsform');
        alertify.notify(datos.mensaje, 'success', 5, function(){  console.log('dismissed'); });
    }else{
        console.log(error)
    }
    console.log(datos.status);
    // Haz algo con los datos recibidos del servidor, como redirigir a otra página
  } catch (error) {
    console.error(error);
  }
});






