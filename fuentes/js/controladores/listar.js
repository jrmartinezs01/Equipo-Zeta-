class ListarController {
    constructor() {
        this.init();
    }

    init() {
        window.listarController = this;
        window.verDetalle = (id) => this.handleRead(id);
        
        document.addEventListener("DOMContentLoaded", () => {
            this.render();
        });
    }

    render() {
        const lista = document.getElementById("listaUsuarios");
        if (!lista) return;

        const usuarios = gestionarUsuarios.listar();
        lista.innerHTML = "";

        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span><strong>${usuario.usuario}</strong> - ${usuario.robot}</span>
                <div class="botones-lista">
                    <button class="btn-read" onclick="verDetalle(${usuario.id})">Leer</button>
                    <button class="btn-edit" onclick="prepararEdicion(${usuario.id})">Editar</button>
                    <button class="btn-delete" onclick="borrarUsuario(${usuario.id})">Eliminar</button>
                </div>
            `;
            lista.appendChild(li);
        });
    }

    handleRead(id) {
        const usuario = gestionarUsuarios.leer(Number(id));
        if (usuario) {
            alert(`
                DETALLE DEL USUARIO:
                -------------------
                ID: ${usuario.id}
                Nombre: ${usuario.usuario}
                Robot: ${usuario.robot}
                Fecha Nacimiento: ${usuario.nacimiento}
                Modo: ${usuario.modo}
                Mejoras: ${usuario.mejoras.join(", ")}
                Misión: ${usuario.mision}
            `);
        }
    }
}

new ListarController();
