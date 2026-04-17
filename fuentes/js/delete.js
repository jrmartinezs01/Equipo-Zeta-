// --- Funcion Delete (Borrar) ---

function borrarUsuario(id) {
  const indice = usuarios.findIndex(u => u.id === id);
  
  if (indice !== -1) {
    const confirmacion = confirm(`¿Seguro que quieres eliminar a este usuario?`);
    if (confirmacion) {
      usuarios.splice(indice, 1);
      // Volvemos a listar (función en read.js)
      leerUsuario();
    }
  }
}
