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

// --- 2. Funcion Read (Leer) ---

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

// --- 3. Funcion Delete (Borrar) ---

function borrarUsuario(id) {
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice !== -1) {
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar al usuario "${usuarios[indice].usuario}"?`);
    if (confirmacion) {
      usuarios.splice(indice, 1);
      // Actualizamos la vista
      leerUsuario();
    }
  }
}
