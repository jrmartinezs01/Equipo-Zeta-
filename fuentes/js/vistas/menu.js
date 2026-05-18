'use strict'
// Vistas
const vista1 = document.querySelector('#Principal')
const vista2 = document.querySelector('#Creacion')
const vista3 = document.querySelector('#Lista')
const vista4 = document.querySelector('#Mapa')
const vista5 = document.querySelector('#Mejoras')
const vistaUpdate = document.querySelector('#vistaUpdate')
const vistaVictoria = document.querySelector('#Victoria')

// Enlaces de navegación
const menu1 = document.getElementsByTagName('a')[0]
const menu2 = document.getElementsByTagName('a')[1]
const menu3 = document.getElementsByTagName('a')[2]
const menu4 = document.getElementsByTagName('a')[3]
const menu5 = document.getElementsByTagName('a')[4]

const botonMenu = document.getElementById('botonMenu');
const nav = document.getElementById('navPrincipal');

// Event Listeners para navegación
menu1.addEventListener('click', verVista1)
menu2.addEventListener('click', verVista2)
menu3.addEventListener('click', verVista3)
menu4.addEventListener('click', verVista4)
menu5.addEventListener('click', verVista5)

botonMenu.addEventListener('click', function() {
    nav.classList.toggle('visible');
	ocultarVistas()
});

// Funciones para cambiar de vista
function verVista1(){
	ocultarVistas()
	vista1.classList.add('activa')
}
function verVista2(){
	ocultarVistas()
	vista2.classList.add('activa')
}
function verVista3(){
	ocultarVistas()
	vista3.classList.add('activa')
}
function verVista4(){
	ocultarVistas()
	vista4.classList.add('activa')
    // Trigger game start if needed
    if (window.tycoonGame) {
        window.tycoonGame.start();
    }
}
function verVista5(){
	ocultarVistas()
	vista5.classList.add('activa')
}
function verUpdate(){
	ocultarVistas()
	vistaUpdate.classList.add('activa')
}

// Función para ocultar todas las vistas
function ocultarVistas(){
	vista1.classList.remove('activa')
	vista2.classList.remove('activa')
	vista3.classList.remove('activa')
	vista4.classList.remove('activa')
	vista5.classList.remove('activa')
	if (vistaUpdate) vistaUpdate.classList.remove('activa')
	if (vistaVictoria) vistaVictoria.classList.remove('activa')
}

// Botones adicionales si existen
const botonUpdate = document.querySelector('#update')
if (botonUpdate) {
    botonUpdate.addEventListener('click', verUpdate)
}
