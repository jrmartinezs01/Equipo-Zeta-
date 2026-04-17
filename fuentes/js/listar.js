
function leerUsuario() {
  const lista = document.getElementById("listaUsuarios");
  if (!lista) return;

  lista.innerHTML = "";

  usuarios.forEach(usuario => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${usuario.usuario}</strong> - ${usuario.robot}</span>
      <div class="botones-lista">
        <button class="btn-edit" onclick="prepararEdicion(${usuario.id})">Editar</button>
        <button class="btn-delete" onclick="borrarUsuario(${usuario.id})">Eliminar</button>
      </div>
    `;
    lista.appendChild(li);
  });
}
