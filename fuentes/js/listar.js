
function leerUsuario() {
  const lista = document.getElementById("listaUsuarios");
  if (!lista) return;

  lista.innerHTML = "";

  usuarios.forEach(usuario => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${usuario.usuario}</strong> - ${usuario.robot}</span>
      <button class="btn-delete" onclick="borrarUsuario(${usuario.id})">Eliminar</button>
      <button class="Actualizar" onclick="Actualizarusuario(${usuario.id})">Actualizar</button>
      `;
    lista.appendChild(li);
  });
}
