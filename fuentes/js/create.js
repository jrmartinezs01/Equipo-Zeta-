const usuarios = [];

function crearUsuario(usuario, contraseña) {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    usuario,
    contraseña,
    nacimiento: document.getElementById("nacimiento").value,
    robot: document.getElementById("robot").value,
    modo: document.querySelector('input[name="modo"]:checked')?.value || "",
    mejoras: Array.from(document.querySelectorAll('input[name="mejoras"]:checked')).map(cb => cb.value),
    mision: document.getElementById("mision").value,
    imagen: document.getElementById("imagen").files[0]?.name || ""
  };
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
}

document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("botonInsertar");

  boton.addEventListener("click", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("password").value.trim();

    if (usuario === "" || contraseña === "") {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    const nuevo = crearUsuario(usuario, contraseña);
    
    // Llamamos a la función para actualizar la vista
    leerUsuario();

    alert(`Usuario "${usuario}" creado con ID ${nuevo.id}`);
  });
});

// --- 1.1 Listar Usuarios ---

// Explicame como se hace sin hacerlo, solo con palabras, sin codigo, como se haria la funcion listarUsuarios() para mostrar los usuarios creados en una lista en el HTML.

function listarUsuarios() {
  // Para listar los usuarios, primero necesitamos acceder al elemento del DOM donde queremos mostrar la lista, por ejemplo, un <ul> o <div> con un id específico.
  const lista = document.getElementById("listaUsuarios");
  
  // Luego, debemos limpiar el contenido de ese elemento para evitar duplicados cada vez que se llame a la función.
  lista.innerHTML = "";

  // A continuación, iteramos sobre el array de usuarios que hemos creado. Para cada usuario, creamos un nuevo elemento HTML (como un <li>) y le asignamos el contenido que queremos mostrar, como el nombre de usuario.
  usuarios.forEach(usuario => {
    const li = document.createElement("li");
    li.textContent = usuario.usuario;  // Aquí puedes personalizar lo que quieres mostrar, como el nombre de usuario o cualquier otra información relevante.
  // Finalmente, añadimos cada nuevo elemento a la lista en el DOM para que se muestre en la página.
    lista.appendChild(li);

    console.log(usuario); // Esto es opcional, pero puede ayudarte a verificar que los usuarios se están iterando correctamente.
  });
}

// Como pruebo que funciona la funcion listarUsuarios()? en firefox
// Para probar que la función listarUsuarios() funciona en Firefox, sigue estos pasos:
// 1. Asegúrate de que tu archivo HTML tiene un elemento con el id "listaUsuarios" donde se mostrará la lista de usuarios.
// 2. Abre tu archivo HTML en Firefox.
// 3. Abre las herramientas de desarrollo de Firefox (puedes hacerlo presionando F12 o haciendo clic derecho y seleccionando "Inspeccionar").
// 4. En la consola de las herramientas de desarrollo, escribe listarUsuarios() y presiona Enter.
// 5. Si la función está correctamente definida y el array de usuarios tiene datos, deberías ver la lista de usuarios aparecer en el elemento con id "listaUsuarios" en tu página web. Si no ves nada, asegúrate de que has creado algunos usuarios antes de llamar a la función listarUsuarios().

// Me sale undefined, que hago?
// Si al llamar a listarUsuarios() en la consola te sale undefined, eso es normal porque la función no devuelve ningún valor (es decir, no tiene un return). Lo importante es que la función esté ejecutando su lógica correctamente. Para verificar que está funcionando, revisa el elemento con id "listaUsuarios" en tu página web para ver si se han agregado los usuarios a la lista. Si no ves ningún cambio, asegúrate de que has creado algunos usuarios antes de llamar a listarUsuarios() y que el array de usuarios no está vacío. También puedes agregar console.log(usuarios) dentro de la función listarUsuarios() para verificar que el array de usuarios contiene datos.



function leerUsuario() {

  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  usuarios.forEach(usuario => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${usuario.usuario}</span>
      <button class="btn-delete" onclick="borrarUsuario(${usuario.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });

}

// --- 3. Funcion Delete (Borrar) ---   Aqui no me sale el boton de eliminar, que hago?
// Si el botón de eliminar no aparece, asegúrate de que la función leerUsuario() se está llamando correctamente después de crear un usuario. Además, verifica que el elemento con id "listaUsuarios" existe en tu HTML y que no hay errores en la consola del navegador. Si todo parece estar en orden, intenta agregar un console.log dentro de la función leerUsuario() para verificar que se está ejecutando y que el array de usuarios contiene datos. También puedes revisar el código HTML generado para asegurarte de que el botón se está creando correctamente.
function borrarUsuario(id) {
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice !== -1) {
    usuarios.splice(indice, 1);
    leerUsuario(); // Volvemos a pintar

    console.log(`Usuario con ID ${id} eliminado.`);

  }
}
