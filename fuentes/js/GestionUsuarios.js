import { Usuario } from './Usuario.js';

export class GestionUsuarios {
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

    // Nueva funcionalidad: Leer (obtener un detalle)
    leer(id) {
        return this.usuarios.find(u => u.id === id) || null;
    }
}

// Exportamos una instancia única para mantener el estado (Singleton-ish)
export const gestionUsuarios = new GestionUsuarios();
