'use strict';

class TycoonGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.contadorLabel = document.getElementById('contador');
        this.score = 0;
        this.trash = null;
        this.robot = null;
        this.robotPos = { x: 50, y: 50 };
        this.trashPos = { x: 0, y: 0 };
        this.speed = 1.5;
        this.isRunning = false;
        this.animationId = null;
        this.isInitialized = false;
    }

    init(robotData) {
        // Si ya estaba inicializado, limpiamos el anterior
        if (this.isInitialized) {
            if (this.robot) this.robot.remove();
            if (this.trash) this.trash.remove();
            this.stop();
            this.score = 0;
            this.contadorLabel.innerText = '0';
        }

        // Crear el robot visualmente
        this.robot = document.createElement('img');
        this.robot.className = 'robot-sprite';
        
        // Podríamos usar robotData.robot para elegir imagen, pero por ahora solo hay una
        this.robot.src = 'imagenes/robot.png'; 
        this.canvas.appendChild(this.robot);

        this.isCollecting = false;
        this.robotPos = { x: 50, y: 50 };

        // Spawnear la primera basura
        this.spawnTrash();
        
        this.isInitialized = true;
        console.log("Tycoon inicializado para el robot:", robotData.robot);
    }

    start() {
        if (this.isInitialized && !this.isRunning) {
            this.isRunning = true;
            this.gameLoop();
        } else if (!this.isInitialized) {
            console.warn("Debe crear un robot primero para iniciar el juego.");
        }
    }

    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }

    spawnTrash() {
        // Si ya hay basura, la eliminamos
        if (this.trash) {
            this.trash.remove();
        }

        this.isCollecting = false;

        // Crear nueva basura
        this.trash = document.createElement('img');
        this.trash.className = 'trash-sprite';
        this.trash.src = 'imagenes/basura.png';

        // Posición aleatoria dentro del canvas
        // Usamos porcentajes para que sea responsivo
        this.trashPos.x = Math.random() * 80 + 10; // Evitar bordes
        this.trashPos.y = Math.random() * 80 + 10;

        this.trash.style.left = `${this.trashPos.x}%`;
        this.trash.style.top = `${this.trashPos.y}%`;

        this.canvas.appendChild(this.trash);
    }

    update() {
        if (!this.isRunning || this.isCollecting) return;

        // Calcular dirección hacia la basura
        const dx = this.trashPos.x - this.robotPos.x;
        const dy = this.trashPos.y - this.robotPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 2) {
            // Mover robot
            this.robotPos.x += (dx / distance) * (this.speed / 5);
            this.robotPos.y += (dy / distance) * (this.speed / 5);
        } else {
            // Recoger basura
            this.collectTrash();
        }

        // Actualizar posición visual del robot
        this.robot.style.left = `${this.robotPos.x}%`;
        this.robot.style.top = `${this.robotPos.y}%`;
    }

    collectTrash() {
        this.isCollecting = true;
        this.score++;
        this.contadorLabel.innerText = this.score;
        
        // Efecto visual
        this.trash.classList.add('collected');
        
        // Respawnear
        setTimeout(() => {
            this.spawnTrash();
        }, 500);
    }

    gameLoop() {
        this.update();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}

// Inicializar el juego y exponerlo globalmente
window.addEventListener('DOMContentLoaded', () => {
    window.tycoonGame = new TycoonGame();
});
