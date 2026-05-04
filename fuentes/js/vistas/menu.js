'use strict'
const vista1= document.getElementById('Principal')
console.log(vista1)
const vista2= document.getElementById('Creacion')
console.log(vista2)
const vista3= document.getElementById('Lista')
console.log(vista3)

const menu1 = document.getElementsByTagName('a')[0]
const menu2 = document.getElementsByTagName('a')[1]
const menu3 = document.getElementsByTagName('a')[2]
const menu4 = document.getElementsByTagName('a')[3]
const vista4 = document.getElementById('Mapa')

const botonMenu = document.getElementById('botonMenu');
const nav = document.getElementById('navPrincipal');

menu1.addEventListener('click', verVista1)
menu2.addEventListener('click', verVista2)
menu3.addEventListener('click', verVista3)
menu4.addEventListener('click', verVista4)

botonMenu.addEventListener('click', function() {
    nav.classList.toggle('visible');
	ocultarVistas()
});

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
function verVista4(){
	ocultarVistas()
	vista4.classList.add('activa')
    // Trigger game start if needed
    if (window.tycoonGame) {
        window.tycoonGame.start();
    }
}
function ocultarVistas(){
	vista1.classList.remove('activa')
	vista2.classList.remove('activa')
	vista3.classList.remove('activa')
	vista4.classList.remove('activa')
}
