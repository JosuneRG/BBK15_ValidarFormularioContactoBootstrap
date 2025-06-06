// 1 - Guarda la información recogida de cada uno de los usuarios en localStorage.
const myForm = document.getElementById('myForm'); // Cambié el id del formulario
const username = document.getElementById('nombre');
const email = document.getElementById('email');
const contrasenya = document.getElementById('contraseña');
const repeatContrasenya = document.getElementById('repeatContraseña');
const btnSubmit = document.getElementById('submit');
const message = document.getElementById('message'); 

let validado = false;

// 1 - Declara el array de contactos a nivel global
let contactos = JSON.parse(localStorage.getItem('contactos')) || [];

//Funcion para validar y insertar datos en localstorage
function saveInfoLocalStorage(event)
{
    event.preventDefault()
    if(validacionCampos())
    {
        insertInfoLocalStorage();
    }  
}

// Función para insertar los datos en localStorage
function insertInfoLocalStorage(event)
{  
    //Crear array de valores
    const newUser = {
         nameLocal: username.value,
         emailLocal: email.value,
         contrasenaLocal: contrasenya.value,
         repeatContrasenaLocal: repeatContrasenya.value
    };
   
    // Crear un objeto con los datos del nuevo contacto
    contactos.push(newUser);
    console.log("Nuevo usuario:",newUser);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('contactos', JSON.stringify(contactos));
  
    console.log("Usuarios guardados:");
    console.log(contactos);
}

// ----------------------------------------------------------------------------------------
function validacionCampos()
{
    message.innerHTML = '';
    // Implementa validación que obligue a rellenar todos los campos.
    if (username.value === '' || email.value === '' || contrasenya.value === '' || repeatContrasenya.value === '') 
    {
        mostrarMensaje('Rellena todos los campos.', false);
        return false;
    }
    
    // Implementa una validación para el correo.
    const regexEmail = /(\w+?@\w+?\x2E.+)/;

    if (regexEmail.test(email.value) !== true) 
    {
        mostrarMensaje('Por favor inserta un email valido.',false);
        return false;
    }
    
    // Implementa una validación que comprueba que la contraseña 1 es la misma que la contraseña 2.
    if(contrasenya.value != repeatContrasenya.value)
    {
        mostrarMensaje("Las contraseñas no coinciden. Deben ser la misma", false);
       return false;
    }
    else
    {
        // Implementa una validación de contraseña.
        const regexContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (regexContrasenia.test(contrasenya.value) !== true) 
        {
             mostrarMensaje('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.', false);
             return false;
        }
    }
    // Al terminar de rellenar los datos del formulario correctamente muestra un mensaje durante 3 segundos que muestre “Usuario creado correctamente” y redirige a la vista Usuarios.
    mostrarMensaje("Usuario creado correctamente.", true)
    return true;
}

// ----------------------------------------------------------------------------------------
// Función para mostrar mensajes de error
function mostrarMensaje(mensaje, validado) 
{
    const divMessage = document.createElement('div');
    
    if(validado === false)
    {
        divMessage.classList.add('alert', 'alert-danger');
        divMessage.textContent = mensaje;
        message.appendChild(divMessage);

           // El mensaje desaparecerá después de 3 segundos
            setTimeout(function() {
                divMessage.remove();
            }, 3000);
    }
    else
    {
        divMessage.classList.add('alert', 'alert-success');
        divMessage.textContent = mensaje;
        message.appendChild(divMessage);
       
        // El mensaje desaparecerá después de 3 segundos
        setTimeout(function() {
            divMessage.remove();
            window.location.href = "usuarios.html";
        }, 3000);
    }
    console.log("Mensaje:", mensaje);
}

// Asignar el evento submit del formulario
myForm.addEventListener('submit', saveInfoLocalStorage);