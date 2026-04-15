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
