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
    console.log("Usuario creado:", nuevo);
    console.log("Lista de usuarios:", usuarios);

    alert(`Usuario "${usuario}" creado con ID ${nuevo.id}`);
  });
});
