class DeleteController {
    constructor() {
        this.init();
    }

    init() {
        // Exponemos la función al objeto global window para que el onclick del HTML la encuentre
        window.borrarUsuario = (id) => this.handleDelete(id);
    }

    handleDelete(id) {
        const idNum = Number(id);
        if (confirm("¿Seguro que quieres eliminar a este usuario?")) {
            if (gestionUsuarios.borrar(idNum)) {
                // Si el borrado es correcto, refrescamos la lista
                if (window.listarController) {
                    window.listarController.render();
                }
                alert("Usuario eliminado correctamente.");
            }
        }
    }
}

// Inicializamos el controlador
new DeleteController();
