class CreateController {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            const boton = document.getElementById("botonInsertar");
            if (boton) {
                boton.addEventListener("click", (e) => this.handleInsert(e));
            }
        });
    }

    handleInsert(e) {
        e.preventDefault();

        const usuarioInput = document.getElementById("usuario").value.trim();
        const passInput = document.getElementById("password").value.trim();

        if (usuarioInput === "" || passInput === "") {
            alert("Por favor, rellena los campos de Usuario y Contraseña.");
            return;
        }

        const datos = {
            usuario: usuarioInput,
            password: passInput,
            nacimiento: document.getElementById("nacimiento").value,
            robot: document.getElementById("robot").value,
            modo: document.querySelector('input[name="modo"]:checked')?.value || "",
            mejoras: Array.from(document.querySelectorAll('input[name="mejoras"]:checked')).map(cb => cb.value),
            mision: document.getElementById("mision").value,
            imagen: document.getElementById("imagen").files[0]?.name || ""
        };

        const nuevo = gestionUsuarios.crear(datos);
        
        // Llamamos al listado (ahora a través de window o instancia global)
        if (window.listarController) {
            window.listarController.render();
        }

        alert(`Usuario "${nuevo.usuario}" creado correctamente.`);
    }
}

new CreateController();
