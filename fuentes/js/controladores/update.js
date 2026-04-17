class UpdateController {
    constructor() {
        this.usuarioEditando = null;
        this.init();
    }

    init() {
        // Exponer función global para el botón EDITAR
        window.prepararEdicion = (id) => this.cargarDatos(id);

        const boton = document.getElementById("botonInsertar");
        if (boton) {
            boton.addEventListener("click", (e) => this.handleSubmit(e));
        }
    }

    cargarDatos(id) {
        const usuario = gestionUsuarios.leer(Number(id));
        if (!usuario) return;

        this.usuarioEditando = usuario.id;

        // Rellenar formulario
        document.getElementById("usuario").value = usuario.usuario;
        document.getElementById("password").value = usuario.contraseña;
        document.getElementById("nacimiento").value = usuario.nacimiento;
        document.getElementById("robot").value = usuario.robot;
        document.getElementById("mision").value = usuario.mision;

        // Cambiar botón
        document.getElementById("botonInsertar").textContent = "Actualizar";

        alert("Modo edición activado");
    }

    handleSubmit(e) {
        e.preventDefault();

        const datos = {
            usuario: document.getElementById("usuario").value.trim(),
            password: document.getElementById("password").value.trim(),
            nacimiento: document.getElementById("nacimiento").value,
            robot: document.getElementById("robot").value,
            modo: document.querySelector('input[name="modo"]:checked')?.value || "",
            mejoras: Array.from(document.querySelectorAll('input[name="mejoras"]:checked')).map(cb => cb.value),
            mision: document.getElementById("mision").value,
            imagen: document.getElementById("imagen").files[0]?.name || ""
        };

        // 🔁 SI estamos editando
        if (this.usuarioEditando !== null) {
            gestionUsuarios.actualizar(this.usuarioEditando, datos);

            this.usuarioEditando = null;
            document.getElementById("botonInsertar").textContent = "Crear";

            alert("Usuario actualizado correctamente");
        }

        // Refrescar lista
        if (window.listarController) {
            window.listarController.render();
        }
    }
}

new UpdateController();