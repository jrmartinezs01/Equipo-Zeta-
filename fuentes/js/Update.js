function Actualizarusuario(id){
const vistaUpdate=document.querySelector('#vistaUpdate')
const botonUpdate=document.querySelector('.Actualizar')
botonUpdate.addEventListener('click', verVistaUpdate)
function verVistaUpdate(){
	ocultarVistas()
	vistaUpdate.classList.add('activa')
	console.log('pinga')
}
}




