'use strict'
const vista1= document.getElementById('Principal')
console.log(vista1)
const vista2= document.getElementById('Creacion')
console.log(vista2)
const vista3= document.getElementById('Lista')
console.log(vista3)
const menu3= document.getElementsByTagName('a')[2]
console.log(menu3)
const menu1= document.getElementsByTagName('a')[0]
console.log(menu1)
const menu2= document.getElementsByTagName('a')[1]
console.log(menu2)
menu1.addEventListener('click', verVista1)
menu2.addEventListener('click', verVista2)
menu3.addEventListener('click', verVista3)
function verVista2(){
	ocultarVistas()
	vista2.classList.add('activa')
}
function verVista3(){
	ocultarVistas()
	vista3.classList.add('activa')
}
function verVista1(){
	ocultarVistas()
	vista1.classList.add('activa')
}
function ocultarVistas(){
	vista1.classList.remove('activa')
	vista2.classList.remove('activa')
	vista3.classList.remove('activa')
}
const botonMenu = document.getElementById('botonMenu');
const nav = document.getElementById('navPrincipal');
	ocultarVistas()

botonMenu.addEventListener('click', function() {
    nav.classList.toggle('visible');
	ocultarVistas()
});