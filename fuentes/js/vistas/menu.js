class Menu {
  constructor() {
	
    this.vista1 = document.querySelector('#Principal')
    this.vista2 = document.querySelector('#Creacion')
    this.vista3 = document.querySelector('#Lista')

    this.menu1 = document.querySelector("#MenuInicio")
    this.menu2 = document.querySelector("#Create")
    this.menu3 = document.querySelector("#Listar")

    this.vistaUpdate = document.querySelector('#vistaUpdate')
    this.botonUpdate = document.querySelector('.Actualizar')

    this.menu1.addEventListener('click', () => this.verVista1())
    this.menu2.addEventListener('click', () => this.verVista2())
    this.menu3.addEventListener('click', () => this.verVista3())
    this.botonUpdate.addEventListener('click', () => this.verVistaUpdate())
  }

  verVista1() {
    this.ocultarVistas()
    this.vista1.classList.add('activa')
  }

  verVista2() {
    this.ocultarVistas()
    this.vista2.classList.add('activa')
  }

  verVista3() {
    this.ocultarVistas()
    this.vista3.classList.add('activa')
  }

  verVistaUpdate() {
    this.ocultarVistas()
    this.vistaUpdate.classList.add('activa')
  }

  ocultarVistas() {
    this.vista1.classList.remove('activa')
    this.vista2.classList.remove('activa')
    this.vista3.classList.remove('activa')
	this.vistaUpdate.classList.remove('activa')
  }
}

new Menu()
