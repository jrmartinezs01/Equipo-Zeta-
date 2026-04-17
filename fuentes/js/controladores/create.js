class GestorUsuarios {
  constructor() {
    this.usuarios = [];
    this.inicializarEventos();
  }

  crearUsuario(usuario, contraseña) {
    const nuevoUsuario = {
      id: this.usuarios.length > 0 ? this.usuarios[this.usuarios.length - 1].id + 1 : 1,
      usuario,
      contraseña,
      nacimiento: document.getElementById("nacimiento").value,
      robot: document.getElementById("robot").value,
      modo: document.querySelector('input[name="modo"]:checked')?.value || "",
      mejoras: Array.from(document.querySelectorAll('input[name="mejoras"]:checked')).map(cb => cb.value),
      mision: document.getElementById("mision").value,
      imagen: document.getElementById("imagen").files[0]?.name || ""
    };

    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
  }

  inicializarEventos() {
    document.addEventListener("DOMContentLoaded", () => {
      const boton = document.getElementById("botonInsertar");

      if (boton) {
        boton.addEventListener("click", (e) => {
          e.preventDefault();

          const usuarioInput = document.getElementById("usuario").value.trim();
          const passInput = document.getElementById("password").value.trim();

          if (usuarioInput === "" || passInput === "") {
            alert("Por favor, rellena los campos de Usuario y Contraseña.");
            return;
          }

          const nuevo = this.crearUsuario(usuarioInput, passInput);

          this.leerUsuario();

          alert(`Usuario "${nuevo.usuario}" creado correctamente.`);
        });
      }
    });
  }

  leerUsuario() {
    console.log(this.usuarios);
  }
}

// Crear una instancia de la clase
const app = new GestorUsuarios();