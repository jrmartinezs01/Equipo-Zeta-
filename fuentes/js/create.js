// --- Funcion Create (Crear) ---

function crearUsuario(usuario, contraseña) {
  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
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

// Escuchador del botón Insertar
document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("botonInsertar");
  if (boton) {
    boton.addEventListener("click", function (e) {
      e.preventDefault();

      const usuarioInput = document.getElementById("usuario").value.trim();
      const passInput = document.getElementById("password").value.trim();

      if (usuarioInput === "" || passInput === "") {
        alert("Por favor, rellena los campos de Usuario y Contraseña.");
        return;
      }

      const nuevo = crearUsuario(usuarioInput, passInput);
      
      // Actualizamos la vista (definida en read.js)
      leerUsuario();

      alert(`Usuario "${nuevo.usuario}" creado correctamente.`);
    });
  }
});
