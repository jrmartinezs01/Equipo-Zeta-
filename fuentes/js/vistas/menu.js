'use strict'
const vista1= document.querySelector('#Principal')
const vista2= document.querySelector('#Creacion')
const vista3= document.querySelector('#Lista')
const vistaUpdate=document.querySelector('#vistaUpdate')
const menu3= document.getElementsByTagName('a')[2]
const menu1= document.getElementsByTagName('a')[0]
const menu2= document.getElementsByTagName('a')[1]
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
function verUpdate(){
	ocultarVistas()
	vistaUpdate.classList.add('activa')
}
function ocultarVistas(){
	vista1.classList.remove('activa')
	vista2.classList.remove('activa')
	vista3.classList.remove('activa')
	vistaUpdate.classList.remove('activa')
}
const botonMenu = document.getElementById('botonMenu');
const nav = document.getElementById('navPrincipal');
	ocultarVistas()

botonMenu.addEventListener('click', function() {
    nav.classList.toggle('visible');
	ocultarVistas()
});
const botonUpdate = document.querySelector('#update')
botonUpdate.addEventListener('click',verUpdate())