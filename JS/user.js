function showUsers() 
{
    // Obtener los contactos del localStorage
    const contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    // Obtener el contenedor donde se mostrarán las tarjetas
    const container = document.getElementById("usuarios-container");
  
    // Verificamos si el contenedor existe
    if (container && contactos.length > 0) 
    {
        // Iteramos sobre el array de contactos para crear las tarjetas
        contactos.forEach(contacto => {

        // Creamos un nuevo div para la card
        const card = document.createElement("div");
        card.className = "col-md-4"; // Le damos la clase de Bootstrap
        card.style.margin = '10px'; 

        // Insertamos el HTML con la información del contacto
        card.innerHTML = `
          <div class="card h-100 shadow">
            <div class="card-body">
              <h5 class="card-title">${contacto.nameLocal}</h5>
              <p class="card-text"><strong>Correo:</strong> ${contacto.emailLocal}</p>
            </div>
          </div>
        `;
  
        // Agregamos la card al contenedor
        container.appendChild(card);
      });

    } 
    else if (container) 
    {
      // Si no hay contactos, mostramos un mensaje
      const noContactsMessage = document.createElement("p");
      noContactsMessage.textContent = "No hay usuarios registrados.";
      container.appendChild(noContactsMessage);
    }
}

  if(window.location.pathname.includes("usuarios.html"))
  {
      console.log("Ejecutando en index.html");
      showUsers();
  }
