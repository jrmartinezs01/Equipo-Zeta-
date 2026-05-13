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
        this.score = 0;             
        this.trashes = [];          
        this.numTrashes = 5;        
        this.robotContainer = null;  // Contenedor que agrupa al robot y su batería
        this.robotImg = null;        // Imagen del robot
        this.batteryFill = null;     // Relleno de la batería (XP)
        this.robotPos = { x: 50, y: 50 }; 
        
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

        this.currentLevelIndex = 0; 
        this.hasNotifiedUpgrade = false; 
        
        this.isRunning = false;     
        this.animationId = null;    
        this.isInitialized = false; 

        this.initUpgradeListener();
    }

    /**
     * Inicializa el juego con los datos del robot creado en el formulario.
     */
    init(robotData) {
        if (this.isInitialized) {
            if (this.robotContainer) this.robotContainer.remove();
            this.trashes.forEach(t => t.element.remove());
            this.trashes = [];
            this.stop();
            this.score = 0;
            this.currentLevelIndex = 0;
            this.updateHUD();
        }

        // --- CREACIÓN DEL ROBOT DINÁMICO ---
        // 1. Creamos el contenedor principal
        this.robotContainer = document.createElement('div');
        this.robotContainer.className = 'robot-container';

        // 2. Creamos la imagen del robot
        this.robotImg = document.createElement('img');
        this.robotImg.className = 'robot-sprite';
        this.updateRobotImage(); // Asigna la imagen inicial
        this.robotContainer.appendChild(this.robotImg);

        // 3. Creamos la estructura de la batería (Barra de XP)
        const batteryCasing = document.createElement('div');
        batteryCasing.className = 'battery-container';
        
        this.batteryFill = document.createElement('div');
        this.batteryFill.className = 'battery-fill';
        batteryCasing.appendChild(this.batteryFill);
        
        this.robotContainer.appendChild(batteryCasing);

        // 4. Lo añadimos al escenario
        this.canvas.appendChild(this.robotContainer);

        this.robotPos = { x: 50, y: 50 }; 

        for (let i = 0; i < this.numTrashes; i++) {
            this.spawnTrash();
        }
        
        this.isInitialized = true;
        this.updateHUD(); 
        console.log("Tycoon inicializado con batería flotante.");
    }

    initUpgradeListener() {
        if (this.botonMejorar) {
            this.botonMejorar.addEventListener('click', () => this.upgrade());
        }
    }

    /**
     * Cambia la imagen del robot según el nivel.
     */
    updateRobotImage() {
        const data = this.levelData[this.currentLevelIndex];
        if (this.robotImg) {
            this.robotImg.src = `imagenes/${data.folder}/${data.file}`;
        }
    }

    /**
     * Sincroniza HUD y la barra de batería.
     */
    updateHUD() {
        const data = this.levelData[this.currentLevelIndex];
        const nextData = this.levelData[this.currentLevelIndex + 1];

        if (this.contadorLabel) this.contadorLabel.innerText = this.score;
        if (this.nivelLabel) this.nivelLabel.innerText = data.name;
        
        if (this.upgradeNivelLabel) this.upgradeNivelLabel.innerText = data.name;
        
        if (this.botonMejorar) {
            if (!nextData) {
                this.botonMejorar.innerText = "Nivel Máximo";
                this.botonMejorar.disabled = true;
                if (this.upgradeCosteLabel) this.upgradeCosteLabel.innerText = "---";
                if (this.batteryFill) this.batteryFill.style.width = "100%";
            } else {
                if (this.upgradeCosteLabel) this.upgradeCosteLabel.innerText = nextData.cost;
                this.botonMejorar.disabled = this.score < nextData.cost;
                this.botonMejorar.innerText = `Mejorar a ${nextData.name}`;

                // --- ACTUALIZAR BATERÍA ---
                if (this.batteryFill) {
                    const progreso = Math.min((this.score / nextData.cost) * 100, 100);
                    this.batteryFill.style.width = `${progreso}%`;
                    
                    // Cambio de color según carga (Opcional, muy "Tycoon")
                    if (progreso < 30) this.batteryFill.style.backgroundColor = "#e74c3c"; // Rojo
                    else if (progreso < 70) this.batteryFill.style.backgroundColor = "#f1c40f"; // Amarillo
                    else this.batteryFill.style.backgroundColor = "#2ecc71"; // Verde
                }
            }
        }
    }

    getUpgradeCost() {
        const nextData = this.levelData[this.currentLevelIndex + 1];
        return nextData ? nextData.cost : Infinity;
    }

    upgrade() {
        const cost = this.getUpgradeCost();
        if (this.score >= cost && this.currentLevelIndex < this.levelData.length - 1) {
            this.score -= cost; 
            this.currentLevelIndex++; 
            
            this.hasNotifiedUpgrade = false; 
            this.updateRobotImage();
            this.updateHUD();
            alert(`¡Robot mejorado al Nivel ${this.levelData[this.currentLevelIndex].name}!`);
        }
    }

    start() {
        if (this.isInitialized && !this.isRunning) {
            this.isRunning = true;
            this.gameLoop();
        }
    }

    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId);
    }

    spawnTrash() {
        const trashElement = document.createElement('img');
        trashElement.className = 'trash-sprite';
        trashElement.src = 'imagenes/basura.png';

        const pos = {
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
        };

        trashElement.style.left = `${pos.x}%`;
        trashElement.style.top = `${pos.y}%`;

        this.canvas.appendChild(trashElement);
        this.trashes.push({ element: trashElement, pos: pos, isCollecting: false });
    }

    update() {
        if (!this.isRunning || this.trashes.length === 0) return;

        const currentSpeed = this.levelData[this.currentLevelIndex].speed;

        let closestTrash = null;
        let minDistance = Infinity;

        for (const t of this.trashes) {
            if (t.isCollecting) continue; 
            const dx = t.pos.x - this.robotPos.x;
            const dy = t.pos.y - this.robotPos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDistance) {
                minDistance = dist;
                closestTrash = t;
            }
        }

        if (closestTrash) {
            const dx = closestTrash.pos.x - this.robotPos.x;
            const dy = closestTrash.pos.y - this.robotPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 2) {
                this.robotPos.x += (dx / distance) * (currentSpeed);
                this.robotPos.y += (dy / distance) * (currentSpeed);
            } else {
                this.collectTrash(closestTrash);
            }
        }

        // --- ACTUALIZAMOS EL CONTENEDOR ENTERO ---
        if (this.robotContainer) {
            this.robotContainer.style.left = `${this.robotPos.x}%`;
            this.robotContainer.style.top = `${this.robotPos.y}%`;
        }
    }

    collectTrash(trashObj) {
        trashObj.isCollecting = true;
        this.score++;
        this.updateHUD();
        
        const cost = this.getUpgradeCost();
        if (this.score >= cost && !this.hasNotifiedUpgrade && this.currentLevelIndex < this.levelData.length - 1) {
            this.hasNotifiedUpgrade = true;
            const nextLevel = this.levelData[this.currentLevelIndex + 1].name;
            alert(`¡Ya puedes mejorar tu robot al nivel ${nextLevel}!`);
        }
        
        trashObj.element.classList.add('collected');
        
        setTimeout(() => {
            trashObj.element.remove();
            this.trashes = this.trashes.filter(t => t !== trashObj);
            this.spawnTrash(); 
        }, 500);
    }

    gameLoop() {
        this.update();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.tycoonGame = new TycoonGame();
});
