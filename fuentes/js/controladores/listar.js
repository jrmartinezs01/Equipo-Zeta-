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
        console.log('a')
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
}

new ListarController();