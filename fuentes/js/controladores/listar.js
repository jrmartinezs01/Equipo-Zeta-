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
                    <button class="btn-edit" id='update' data-id="${usuario.id}">Editar</button>
                    <button class="btn-delete" onclick="borrarUsuario(${usuario.id})">Eliminar</button>
                </div>
            `;
            lista.appendChild(li);
            lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-edit")) {
        const id = e.target.dataset.id;
        this.prepararEdicion(id);
        
    }
});
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
    
    prepararEdicion(id){
        const usuario = gestionarUsuarios.leer(Number(id));
        const ZonaActualizar=document.querySelector('#vistaUpdate');

         ZonaActualizar.innerHTML = `
    <form id="formulario">
        <p>
            <label>Usuario:</label>
            <input type="text" name="usuario" value="${usuario.usuario}" required>
        </p>

        <p>
            <label>Contraseña:</label>
            <input type="password" name="password" value="${usuario.password}" required>
        </p>

        <p>
            <label>Fecha de nacimiento:</label>
            <input type="date" name="nacimiento" value="${usuario.nacimiento}">
        </p>

        <p>
            <label>Robot:</label>
            <select name="robot">
                <option value="">-- Selecciona --</option>
                <option value="r1" ${usuario.robot === "r1" ? "selected" : ""}>WALL-E Mk1</option>
                <option value="r2" ${usuario.robot === "r2" ? "selected" : ""}>TRASH-X 3000</option>
            </select>
        </p>

        <p>Modo de operación:</p>
        <p>
            <label><input type="radio" name="modo" value="auto" ${usuario.modo === "auto" ? "checked" : ""}> Automático</label>
            <label><input type="radio" name="modo" value="manual" ${usuario.modo === "manual" ? "checked" : ""}> Manual</label>
            <label><input type="radio" name="modo" value="hibrido" ${usuario.modo === "hibrido" ? "checked" : ""}> Híbrido</label>
        </p>

        <p>Mejoras:</p>
        <p>
            <label><input type="checkbox" name="mejoras" value="turbo" ${usuario.mejoras.includes("turbo") ? "checked" : ""}> Turbo</label>
            <label><input type="checkbox" name="mejoras" value="capacidad" ${usuario.mejoras.includes("capacidad") ? "checked" : ""}> Contenedor extra</label>
            <label><input type="checkbox" name="mejoras" value="ia" ${usuario.mejoras.includes("ia") ? "checked" : ""}> Módulo IA</label>
            <label><input type="checkbox" name="mejoras" value="solar" ${usuario.mejoras.includes("solar") ? "checked" : ""}> Panel solar</label>
        </p>

        <p>
            <label>Descripción de la misión:</label><br>
            <textarea name="mision">${usuario.mision}</textarea>
        </p>

        <p>
            <label>Imagen del robot:</label>
            <input type="file" name="imagen">
        </p>

        <p>
            <button type="button" id='btnActualizar'>Actualizar</button>
            <button type="reset">Reiniciar</button>
        </p>
    </form>
  `;
  const form = document.getElementById("formulario");
  console.log(form)
const btn = document.querySelector("#btnActualizar");
console.log(btn);
btn.addEventListener("click", () => {
    const datos = new FormData(form);

    const usuarioActualizado = {
        id: usuario.id,
        usuario: datos.get("usuario"),
        password: datos.get("password"),
        nacimiento: datos.get("nacimiento"),
        robot: datos.get("robot"),
        modo: datos.get("modo"),
        mejoras: datos.getAll("mejoras"),
        mision: datos.get("mision")
    };

    gestionarUsuarios.actualizar(usuarioActualizado);

    this.render();
    ZonaActualizar.innerHTML = "";

    alert("Usuario actualizado correctamente");
});
    }
}

new ListarController();
