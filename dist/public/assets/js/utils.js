


function limpiarFormulario(sIDFormulario) {
    // Obtén una referencia al formulario
    var formulario = document.getElementById(sIDFormulario);

    // Recorre todos los elementos del formulario
    for (var i = 0; i < formulario.elements.length; i++) {
        var elemento = formulario.elements[i];
        
        // Verifica el tipo de elemento y limpia su valor
        switch (elemento.type) {
            case "text":
            case "textarea":
            case "number":
            case "date":
            case "file":
            elemento.value = "";
            break;
            case "checkbox":
            case "radio":
            elemento.checked = false;
            break;
            case "select":
            elemento.selectedIndex = -1;
            break;
        }
    }
}

export { limpiarFormulario };