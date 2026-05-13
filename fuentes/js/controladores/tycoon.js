'use strict';

/**
 * Clase TycoonGame: Gestiona la lógica del mini-juego de recolección de basura.
 * Implementada con un enfoque modular para facilitar su explicación en DAW 1.
 */
class TycoonGame {
    constructor() {
        // --- Referencias al DOM (Elementos HTML) ---
        this.canvas = document.getElementById('game-canvas');
        this.contadorLabel = document.getElementById('contador');
        this.nivelLabel = document.getElementById('nivel');
        
        // Elementos de la interfaz de la pestaña de Mejoras
        this.upgradeNivelLabel = document.getElementById('upgrade-nivel');
        this.upgradeCosteLabel = document.getElementById('upgrade-coste');
        this.botonMejorar = document.getElementById('botonMejorar');

        // --- Estado del Juego ---
        this.score = 0;             // Monedas / Basura recogida
        this.trashes = [];          // Lista de objetos que representan la basura en pantalla
        this.numTrashes = 5;        // Cantidad constante de basura que queremos mantener
        this.robot = null;          // Elemento img del robot
        this.robotPos = { x: 50, y: 50 }; // Posición inicial (en %)
        
        /**
         * levelData: Array de objetos que define la progresión del juego.
         * En DAW 1, esto es un gran ejemplo de cómo separar los datos de la lógica.
         */
        this.levelData = [
            { name: "1", folder: "robot_1", file: "robot.png", speed: 0.10, cost: 0 },
            { name: "1-2", folder: "robot_1", file: "robot1-2-.png", speed: 0.15, cost: 15 },
            { name: "2", folder: "robot_2", file: "robot2.png", speed: 0.20, cost: 35 },
            { name: "2-2", folder: "robot_2", file: "robot2-2.png", speed: 0.25, cost: 65 },
            { name: "3", folder: "robot_3", file: "robot3.png", speed: 0.32, cost: 110 },
            { name: "3-2", folder: "robot_3", file: "robot3-2.png", speed: 0.42, cost: 175 },
            { name: "4", folder: "robot_4", file: "robot4.png", speed: 0.55, cost: 260 },
            { name: "4-2", folder: "robot_4", file: "robot4-2.png", speed: 0.75, cost: 380 }
        ];

        this.currentLevelIndex = 0; // Índice que apunta al nivel actual en el array
        this.hasNotifiedUpgrade = false; // Bandera para que el aviso de mejora salga solo una vez
        
        // --- Control del Ciclo de Vida ---
        this.isRunning = false;     // Si el juego se está moviendo o no
        this.animationId = null;    // ID del frame de animación (para poder pararlo)
        this.isInitialized = false; // Para evitar que el juego arranque sin un robot creado

        this.initUpgradeListener();
    }

    /**
     * Inicializa el juego con los datos del robot creado en el formulario.
     */
    init(robotData) {
        // Si ya hay un juego en marcha, limpiamos el escenario anterior
        if (this.isInitialized) {
            if (this.robot) this.robot.remove();
            this.trashes.forEach(t => t.element.remove());
            this.trashes = [];
            this.stop();
            this.score = 0;
            this.currentLevelIndex = 0;
            this.updateHUD();
        }

        // Crear el elemento visual del robot
        this.robot = document.createElement('img');
        this.robot.className = 'robot-sprite';
        this.updateRobotImage(); // Asigna la imagen según el nivel
        this.canvas.appendChild(this.robot);

        this.robotPos = { x: 50, y: 50 }; // Reinicia posición al centro

        // Crea las basuras iniciales
        for (let i = 0; i < this.numTrashes; i++) {
            this.spawnTrash();
        }
        
        this.isInitialized = true;
        this.updateHUD(); // Sincroniza los textos de la pantalla
        console.log("Tycoon inicializado. Nivel 1. Velocidad equilibrada.");
    }

    /**
     * Escucha el evento click del botón de mejora en la pestaña correspondiente.
     */
    initUpgradeListener() {
        if (this.botonMejorar) {
            this.botonMejorar.addEventListener('click', () => this.upgrade());
        }
    }

    /**
     * Cambia el atributo src del robot basándose en los datos del nivel actual.
     */
    updateRobotImage() {
        const data = this.levelData[this.currentLevelIndex];
        if (this.robot) {
            this.robot.src = `imagenes/${data.folder}/${data.file}`;
        }
    }

    /**
     * Sincroniza toda la información visual (HUD) con las variables del código.
     */
    updateHUD() {
        const data = this.levelData[this.currentLevelIndex];
        const nextData = this.levelData[this.currentLevelIndex + 1];

        // Actualiza etiquetas en la vista del Mapa
        if (this.contadorLabel) this.contadorLabel.innerText = this.score;
        if (this.nivelLabel) this.nivelLabel.innerText = data.name;
        
        // Actualiza etiquetas en la vista de Mejoras
        if (this.upgradeNivelLabel) this.upgradeNivelLabel.innerText = data.name;
        
        // Controla el estado del botón de mejora
        if (this.botonMejorar) {
            if (!nextData) {
                this.botonMejorar.innerText = "Nivel Máximo";
                this.botonMejorar.disabled = true;
                if (this.upgradeCosteLabel) this.upgradeCosteLabel.innerText = "---";
            } else {
                if (this.upgradeCosteLabel) this.upgradeCosteLabel.innerText = nextData.cost;
                // Deshabilitar botón si no hay suficiente dinero
                this.botonMejorar.disabled = this.score < nextData.cost;
                this.botonMejorar.innerText = `Mejorar a ${nextData.name}`;
            }
        }
    }

    /**
     * Retorna el coste del siguiente nivel si existe.
     */
    getUpgradeCost() {
        const nextData = this.levelData[this.currentLevelIndex + 1];
        return nextData ? nextData.cost : Infinity;
    }

    /**
     * Ejecuta el proceso de subir de nivel restando el coste correspondiente.
     */
    upgrade() {
        const cost = this.getUpgradeCost();
        if (this.score >= cost && this.currentLevelIndex < this.levelData.length - 1) {
            this.score -= cost; // Restamos el coste (economía del Tycoon)
            this.currentLevelIndex++; // Avanzamos al siguiente objeto del array
            
            this.hasNotifiedUpgrade = false; // Reset para el siguiente aviso
            this.updateRobotImage();
            this.updateHUD();
            alert(`¡Robot mejorado al Nivel ${this.levelData[this.currentLevelIndex].name}!`);
        }
    }

    /**
     * Activa el bucle del juego si todo está listo.
     */
    start() {
        if (this.isInitialized && !this.isRunning) {
            this.isRunning = true;
            this.gameLoop();
        }
    }

    /**
     * Detiene el movimiento del robot.
     */
    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }

    /**
     * Crea un elemento de basura en una posición aleatoria del canvas.
     */
    spawnTrash() {
        const trashElement = document.createElement('img');
        trashElement.className = 'trash-sprite';
        trashElement.src = 'imagenes/basura.png';

        // Generamos posición aleatoria en porcentaje (10% a 90% para evitar bordes)
        const pos = {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
        };

        trashElement.style.left = `${pos.x}%`;
        trashElement.style.top = `${pos.y}%`;

        this.canvas.appendChild(trashElement);
        // Guardamos el elemento y su posición en un array para que el robot pueda "verlo"
        this.trashes.push({ element: trashElement, pos: pos, isCollecting: false });
    }

    /**
     * Algoritmo de actualización: Aquí es donde reside la "IA" del robot.
     */
    update() {
        if (!this.isRunning || this.trashes.length === 0) return;

        const currentSpeed = this.levelData[this.currentLevelIndex].speed;

        // 1. DETERMINAR OBJETIVO: Buscar la basura más cercana
        let closestTrash = null;
        let minDistance = Infinity;

        for (const t of this.trashes) {
            if (t.isCollecting) continue; // Ignora basura que ya está desapareciendo
            const dx = t.pos.x - this.robotPos.x;
            const dy = t.pos.y - this.robotPos.y;
            // Cálculo de distancia mediante Pitágoras
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistance) {
                minDistance = dist;
                closestTrash = t;
            }
        }

        // 2. MOVIMIENTO: Desplazarse hacia el objetivo
        if (closestTrash) {
            const dx = closestTrash.pos.x - this.robotPos.x;
            const dy = closestTrash.pos.y - this.robotPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 2) {
                // Normalizamos el vector de movimiento y aplicamos la velocidad
                this.robotPos.x += (dx / distance) * (currentSpeed);
                this.robotPos.y += (dy / distance) * (currentSpeed);
            } else {
                // Si la distancia es muy corta, el robot la ha recogido
                this.collectTrash(closestTrash);
            }
        }

        // 3. RENDERIZADO: Aplicar las nuevas coordenadas al elemento HTML
        this.robot.style.left = `${this.robotPos.x}%`;
        this.robot.style.top = `${this.robotPos.y}%`;
    }

    /**
     * Lógica de recolección: aumenta puntos, avisa de mejoras y repone la basura.
     */
    collectTrash(trashObj) {
        trashObj.isCollecting = true;
        this.score++;
        this.updateHUD();
        
        // Comprobar si puede mejorar para mostrar el aviso
        const cost = this.getUpgradeCost();
        if (this.score >= cost && !this.hasNotifiedUpgrade && this.currentLevelIndex < this.levelData.length - 1) {
            this.hasNotifiedUpgrade = true;
            const nextLevel = this.levelData[this.currentLevelIndex + 1].name;
            alert(`¡Ya puedes mejorar tu robot al nivel ${nextLevel}!`);
        }
        
        // Animación de desaparición (clase CSS)
        trashObj.element.classList.add('collected');
        
        // Esperamos a que la animación termine antes de borrar y crear una nueva
        setTimeout(() => {
            trashObj.element.remove();
            this.trashes = this.trashes.filter(t => t !== trashObj);
            this.spawnTrash(); // Reposición infinita de basura
        }, 500);
    }

    /**
     * Bucle principal de animación (High Performance Loop)
     */
    gameLoop() {
        this.update();
        // Llama a la función de nuevo en el siguiente refresco del monitor (60fps)
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}

// Inicialización global cuando el DOM está listo
window.addEventListener('DOMContentLoaded', () => {
    window.tycoonGame = new TycoonGame();
});
