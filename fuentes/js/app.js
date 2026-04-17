// Definición de la entidad Usuario
class Usuario {
    constructor(id, nombre, password, nacimiento, robot, modo, mejoras, mision, imagen) {
        this.id = id;
        this.usuario = nombre;
        this.contraseña = password;
        this.nacimiento = nacimiento;
        this.robot = robot;
        this.modo = modo;
        this.mejoras = mejoras;
        this.mision = mision;
        this.imagen = imagen;
    }
}

// Clase que gestiona el motor de datos del CRUD
class GestionUsuarios {
    constructor() {
        this.usuarios = [];
    }

    crear(datos) {
        const id = this.usuarios.length > 0 ? this.usuarios[this.usuarios.length - 1].id + 1 : 1;
        const nuevoUsuario = new Usuario(
            id,
            datos.usuario,
            datos.password,
            datos.nacimiento,
            datos.robot,
            datos.modo,
            datos.mejoras,
            datos.mision,
            datos.imagen
        );
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    borrar(id) {
        const indice = this.usuarios.findIndex(u => u.id === id);
        if (indice !== -1) {
            this.usuarios.splice(indice, 1);
            return true;
        }
        return false;
    }

    listar() {
        return this.usuarios;
    }

    leer(id) {
        return this.usuarios.find(u => u.id === id) || null;
    }
}

// Instancia global para que los controladores la usen
const gestionUsuarios = new GestionUsuarios();
