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
        this.monedasLabel = document.getElementById('monedas'); // Nuevo: Monedas
        
        // Elementos de la interfaz de la pestaña de Mejoras
        this.upgradeNivelLabel = document.getElementById('upgrade-nivel');
        this.upgradeCosteLabel = document.getElementById('upgrade-coste');
        this.botonMejorar = document.getElementById('botonMejorar');

        // --- Estado del Juego ---
        this.score = 0;             
        this.monedas = 10;           // Empieza con 10 monedas
        this.trashes = [];          
        this.numTrashes = 5;        
        this.numRobots = 4;          // Límite de robots
        this.robots = [];            // Arreglo para almacenar la flota de robots
        this.robotCosts = [10, 20, 40, 80]; // Precios incrementales
        
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
        
        this.isRunning = false;     
        this.animationId = null;    
        this.isInitialized = false; 

        this.initUpgradeListener();
    }

    /**
     * Inicializa el juego.
     */
    init(robotData) {
        if (this.isInitialized) {
            this.robots.forEach(r => r.container.remove());
            this.robots = [];
            this.trashes.forEach(t => t.element.remove());
            this.trashes = [];
            this.stop();
            this.score = 0;
            this.monedas = 10;
            this.updateHUD();
        }

        for (let i = 0; i < this.numTrashes; i++) {
            this.spawnTrash();
        }
        
        this.isInitialized = true;
        this.updateHUD(); 
        console.log("Tycoon inicializado. Listo para comprar robots.");
    }

    initUpgradeListener() {
        if (this.botonMejorar) {
            this.botonMejorar.addEventListener('click', () => this.comprarRobot());
        }
    }

    getCurrentRobotCost() {
        if (this.robots.length >= this.numRobots) return Infinity;
        return this.robotCosts[this.robots.length];
    }

    comprarRobot() {
        const cost = this.getCurrentRobotCost();
        if (this.monedas >= cost && this.robots.length < this.numRobots) {
            this.monedas -= cost;
            
            const robot = {
                container: document.createElement('div'),
                img: document.createElement('img'),
                batteryFill: document.createElement('div'),
                pos: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
                // Movimiento independiente: offset de wandering único por robot
                wanderOffset: Math.random() * Math.PI * 2,
                wanderSpeed: 0.008 + Math.random() * 0.012,
                levelIndex: 0,
                collectedTrash: 0
            };

            robot.container.className = 'robot-container';
            robot.img.className = 'robot-sprite';
            
            // Asignar imagen inicial
            this.updateRobotImage(robot);
            robot.container.appendChild(robot.img);

            const batteryCasing = document.createElement('div');
            batteryCasing.className = 'battery-container';
            robot.batteryFill.className = 'battery-fill';
            batteryCasing.appendChild(robot.batteryFill);
            robot.container.appendChild(batteryCasing);

            this.canvas.appendChild(robot.container);
            this.robots.push(robot);
            
            this.updateHUD();
        }
    }

    /**
     * Cambia la imagen del robot según su nivel.
     */
    updateRobotImage(robot) {
        const data = this.levelData[robot.levelIndex];
        if (robot.img) {
            robot.img.src = `imagenes/${data.folder}/${data.file}`;
        }
    }

    /**
     * Sincroniza HUD y estado general.
     */
    updateHUD() {
        if (this.contadorLabel) this.contadorLabel.innerText = this.score;
        if (this.monedasLabel) this.monedasLabel.innerText = this.monedas;
        
        if (this.nivelLabel) this.nivelLabel.innerText = "Varios";
        if (this.upgradeNivelLabel) this.upgradeNivelLabel.innerText = `${this.robots.length}`;
        
        if (this.botonMejorar) {
            if (this.robots.length >= this.numRobots) {
                this.botonMejorar.innerText = "Flota Completa";
                this.botonMejorar.disabled = true;
                if (this.upgradeCosteLabel) this.upgradeCosteLabel.innerText = "---";
            } else {
                const cost = this.getCurrentRobotCost();
                this.botonMejorar.innerText = `Comprar Robot (${cost})`;
                this.botonMejorar.disabled = this.monedas < cost;
                if (this.upgradeCosteLabel) this.upgradeCosteLabel.innerText = cost;
            }
        }
    }

    /**
     * Actualiza la batería de un robot individualmente.
     */
    updateRobotBattery(robot) {
        const nextData = this.levelData[robot.levelIndex + 1];
        if (!nextData) {
            if (robot.batteryFill) {
                robot.batteryFill.style.width = "100%";
                robot.batteryFill.style.backgroundColor = "#2ecc71";
            }
            return;
        }

        if (robot.batteryFill) {
            const progreso = Math.min((robot.collectedTrash / nextData.cost) * 100, 100);
            robot.batteryFill.style.width = `${progreso}%`;
            
            if (progreso < 30) robot.batteryFill.style.backgroundColor = "#e74c3c"; // Rojo
            else if (progreso < 70) robot.batteryFill.style.backgroundColor = "#f1c40f"; // Amarillo
            else robot.batteryFill.style.backgroundColor = "#2ecc71"; // Verde
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

    /**
     * Efecto visual de brillo cuando el robot sube de nivel.
     */
    triggerLevelUpEffect(robot) {
        if (!robot.container) return;
        robot.container.classList.add('level-up');
        
        // Mostrar texto flotante "¡Nivel Up!"
        const txt = document.createElement('span');
        txt.className = 'level-up-text';
        txt.textContent = `⬆ Nivel ${this.levelData[robot.levelIndex].name}!`;
        robot.container.appendChild(txt);
        
        setTimeout(() => {
            robot.container.classList.remove('level-up');
            if (txt.parentNode) txt.remove();
        }, 1000);
    }

    update() {
        if (!this.isRunning || this.trashes.length === 0) return;

        this.robots.forEach(robot => {
            const currentSpeed = this.levelData[robot.levelIndex].speed;

            let closestTrash = null;
            let minDistance = Infinity;

            for (const t of this.trashes) {
                if (t.isCollecting) continue; 
                const dx = t.pos.x - robot.pos.x;
                const dy = t.pos.y - robot.pos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestTrash = t;
                }
            }

            if (closestTrash) {
                const dx = closestTrash.pos.x - robot.pos.x;
                const dy = closestTrash.pos.y - robot.pos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 2) {
                    // Movimiento independiente: cada robot tiene un pequeño desvío de wandering
                    robot.wanderOffset += robot.wanderSpeed;
                    const wanderX = Math.sin(robot.wanderOffset) * 0.4;
                    const wanderY = Math.cos(robot.wanderOffset * 1.3) * 0.4;

                    robot.pos.x += (dx / distance) * currentSpeed + wanderX * currentSpeed;
                    robot.pos.y += (dy / distance) * currentSpeed + wanderY * currentSpeed;

                    // Mantener dentro del canvas
                    robot.pos.x = Math.max(2, Math.min(98, robot.pos.x));
                    robot.pos.y = Math.max(2, Math.min(98, robot.pos.y));
                } else {
                    this.collectTrash(closestTrash, robot);
                }
            }

            // --- ACTUALIZAMOS EL CONTENEDOR ENTERO ---
            if (robot.container) {
                robot.container.style.left = `${robot.pos.x}%`;
                robot.container.style.top = `${robot.pos.y}%`;
            }
        });
    }

    collectTrash(trashObj, robot) {
        trashObj.isCollecting = true;
        this.score++;
        this.monedas++; // Gana una moneda por basura
        robot.collectedTrash++;
        
        // Auto-mejora individual
        const nextData = this.levelData[robot.levelIndex + 1];
        if (nextData && robot.collectedTrash >= nextData.cost) {
            robot.levelIndex++;
            this.updateRobotImage(robot);
            console.log(`Robot subió al nivel ${this.levelData[robot.levelIndex].name}`);
            
            // Efecto visual de brillo al subir de nivel
            this.triggerLevelUpEffect(robot);
            
            // Comprobar victoria
            if (this.robots.length === this.numRobots && this.robots.every(r => r.levelIndex === this.levelData.length - 1)) {
                this.victoria();
            }
        }
        
        this.updateHUD();
        this.updateRobotBattery(robot);
        
        trashObj.element.classList.add('collected');
        
        setTimeout(() => {
            if (trashObj.element && trashObj.element.parentNode) {
                trashObj.element.remove();
            }
            this.trashes = this.trashes.filter(t => t !== trashObj);
            
            // Solo hacer spawn de nueva basura si el juego no ha terminado
            if (this.isRunning) {
                this.spawnTrash(); 
            }
        }, 500);
    }

    victoria() {
        this.stop();
        
        // Limpiar toda la basura restante de la pantalla
        this.trashes.forEach(t => t.element.remove());
        this.trashes = [];
        
        document.querySelectorAll('.vista').forEach(v => v.classList.remove('activa'));
        const vistaVictoria = document.getElementById('Victoria');
        if (vistaVictoria) {
            vistaVictoria.classList.add('activa');
        }
    }
    
    gameLoop() {
        this.update();
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.tycoonGame = new TycoonGame();
});
