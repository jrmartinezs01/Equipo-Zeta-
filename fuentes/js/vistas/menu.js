'use strict'
const vistaUpdate=document.querySelector('#vistaUpdate')
const vista1= document.querySelector('#Principal')
const vista2= document.querySelector('#Creacion')
const vista3= document.querySelector('#Lista')
const menu1= document.querySelector("#MenuInicio")
const menu2= document.querySelector("#Create")
const menu3= document.querySelector("#Listar")
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
	vistaUpdate.classList.remove('activa')
}