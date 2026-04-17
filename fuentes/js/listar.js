import { gestionUsuarios } from './GestionUsuarios.js';

export class ListarController {
    constructor() {
        this.init();
    }

    init() {
        window.listarController = this;
        window.borrarUsuario = (id) => this.handleDelete(id);
        window.verDetalle = (id) => this.handleRead(id);
        
        document.addEventListener("DOMContentLoaded", () => {
            this.render();
        });
    }

    render() {
        const lista = document.getElementById("listaUsuarios");
        if (!lista) return;

        const usuarios = gestionUsuarios.listar();
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

    handleDelete(id) {
        if (confirm("¿Seguro que quieres eliminar a este usuario?")) {
            if (gestionUsuarios.borrar(id)) {
                this.render();
            }
        }
    }

    handleRead(id) {
        const usuario = gestionUsuarios.leer(id);
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
