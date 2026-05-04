function Actualizarusuario(id){
const vistaUpdate=document.querySelector('#vistaUpdate')
const botonUpdate=document.querySelector('.Actualizar')
botonUpdate.addEventListener('click', verVistaUpdate)
function verVistaUpdate(){
	const usuario = usuarios.find(u => u.id === id);
	ocultarVistas()
	vistaUpdate.classList.add('activa')
	const lista = document.getElementById("listaUpdate");
	if (!lista) return;
    lista.innerHTML = `
  Usuario: <input id="editUsuario" value="${usuario.usuario}"><br>
  Contraseña: <input id="editPass" value="${usuario.contraseña}"><br>
  Nacimiento: <input id="editNacimiento" value="${usuario.nacimiento}"><br>
  Robot: <input id="editRobot" value="${usuario.robot}"><br>
  Modo: <input id="editModo" value="${usuario.modo}"><br>
  Mejoras: <input id="editMejoras" value="${usuario.mejoras.join(", ")}"><br>
  Mision: <input id="editMision" value="${usuario.mision}"><br>
  <button id="guardarCambios">Guardar</button>
	`;
document.getElementById("guardarCambios").addEventListener("click", () => {
  guardarCambios(usuario.id);
});
		function guardarCambios(id) {
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) return;

  usuario.usuario = document.getElementById("editUsuario").value;
  usuario.contraseña = document.getElementById("editPass").value;
  usuario.nacimiento = document.getElementById("editNacimiento").value;
  usuario.robot = document.getElementById("editRobot").value;
  usuario.modo = document.getElementById("editModo").value;
  usuario.mejoras = document.getElementById("editMejoras").value.split(", ");
  usuario.mision = document.getElementById("editMision").value;

  alert("Usuario actualizado correctamente");

  console.log(usuarios); // para comprobar
}
}
}




