const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//const errorEmail = document.querySelector('#divEmail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListeners();

function eventListeners() {

    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    btnReset.addEventListener('click', resetearFormulario);

    formulario.addEventListener('submit', enviarEmail);

  
}


function iniciarApp() {

    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {

    e.preventDefault();

    const er = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    if (e.target.value.length > 0) {

        //Borrar errores
        const error = document.querySelector('p.error');

        if (error != null) {
            error.remove();
        }


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');


        if (e.target.type === 'email') {

            if (er.test(e.target.value)) {
                console.log('email valido')
            } else {

                mostrarError('No es el formato email');
            }
        }
    } else {

        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');

        mostrarError('Todos los campos son obligartorios');
    }


    if (er.test(email.value) && asunto.value !=='' && mensaje.value !== '') {
   
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        
    }


}


function mostrarError(mensaje) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'backgroundcolor-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {

        formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));

    }

}

function resetearFormulario(){
 
    formulario.reset();

    iniciarApp();
}

function enviarEmail(e) {

    e.preventDefault();
    
    //Mostrar spinner

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //inserta el parrafo antes del spinner aunque este oculto
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {

            parrafo.remove();
            resetearFormulario();
        

        }, 5000);

    }, 3000);

}

