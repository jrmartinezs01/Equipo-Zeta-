function borrarUsuario(id) {
  const indice = usuarios.findIndex(u => u.id === id);
  if (indice !== -1) {
    usuarios.splice(indice, 1);
    leerUsuario(); 
    console.log(`Usuario con ID ${id} eliminado.`);
  }
}