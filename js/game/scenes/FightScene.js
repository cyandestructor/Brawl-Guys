import Scene from "../../engine/Scene.js";
import Character from "../gameObjects/Character.js";
import Resources from "../../engine/Resources.js";
import CharacterAi from "../gameObjects/CharacterAi.js";
import MapFactory from "../MapFactory.js";
import GameManager from "../GameManager.js";
import ItemSpawner from "../ItemSpawner.js";

// Todas las escenas extienden la clase base Scene
export default class FightScene extends Scene {
    players = [];
    cpu = [];
    
    pause = false;
    itemSpawner;

    constructor(canvas) {
        const camera = new THREE.PerspectiveCamera (
            45,
            canvas.width / canvas.height,
            0.1,
            1000
        );
        camera.position.set(0, -5, 30);
        
        const renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( new THREE.Color(1 , 1, 1));
		renderer.setSize(canvas.width, canvas.height);

        document.getElementById(canvas.id).append(renderer.domElement);

        // Esto es importante para especificar la cámara y el renderer de la escena
        super(camera, renderer);

        this.prepare();
    }

    prepare() {
        const ambient = new THREE.AmbientLight(
            new THREE.Color(1,1,1),
            1.0
        );

        const directional = new THREE.DirectionalLight(
            new THREE.Color(1,1,1),
            0.2
        );

        directional.position.set(0,0,1);

        // Con el método addNative se pueden agregar objetos nativos de Three.js
        this.addNative(ambient);
        this.addNative(directional);
        
        var mapName = localStorage.getItem('map');
        const mapa = MapFactory.create(this, mapName);
        this.add(mapa);

        const geometry = new THREE.PlaneGeometry( 200, 50 );
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        const plane = new THREE.Mesh( geometry, material );
        plane.visible = false;
        plane.rotation.x = THREE.Math.degToRad(-90);
        plane.position.y = -19.6;
        plane.userData.solid = true;
        this.addNative(plane);

        // La clase Character extiende una clase base llamada GameObject
        // que envuelve un objeto nativo de Three.js y le agrega cierta lógica
        // Consulta los archivos js/game/gameObjects/Character.js y js/engine/GameObject.js

        const CpuLevel = {
            EASY: 0,
            NORMAL: 1,
            HARD: 2
        };

        const MAX_PLAYERS = 3;
        const MAX_CPU = 3;

        // Default settings
        let totalPlayers = 1;
        let totalCpu = 1;
        let cpuLevel = CpuLevel.NORMAL;
        let itemsOn = true;
        
        const gameSettingsJSON = localStorage.getItem('gameSettings');
        if (gameSettingsJSON != null) {
            const gameSettings = JSON.parse(gameSettingsJSON);

            totalPlayers = gameSettings.players ?? 1;
            totalCpu = gameSettings.cpu ?? 1;
            cpuLevel = gameSettings.cpuLevel ?? CpuLevel.NORMAL;
            itemsOn = gameSettings.items ?? true;

            // Validate settings
            totalPlayers = Math.min(totalPlayers, MAX_PLAYERS);
            totalPlayers = Math.max(totalPlayers, 0);

            totalCpu = Math.min(totalCpu, MAX_CPU);
            totalCpu = Math.max(totalCpu, 0);

            cpuLevel = Math.min(cpuLevel, CpuLevel.HARD);
            cpuLevel = Math.max(cpuLevel, CpuLevel.EASY);
        }

        const playersSkins = JSON.parse(localStorage.getItem('players') ?? '{}');
        const cpuSkins = JSON.parse(localStorage.getItem('cpu') ?? '{}');

        const controlMaps = [
            {
                right: "D",
                left: "A",
                up: "W",
                down: "S",
                punch: "Q",
                kick: "E",
                jump: " ",
                interact: "Q"
            },
            {
                right: "L",
                left: "J",
                up: "I",
                down: "K",
                punch: "U",
                kick: "O",
                jump: "M",
                interact: "U"
            },
            {
                right: "6",
                left: "4",
                up: "8",
                down: "5",
                punch: "7",
                kick: "9",
                jump: "0",
                interact: "7"
            }
        ];

        for (let i = 0; i < totalPlayers; i++) {
            this.players.push(
                new Character(this, {
                    position: new THREE.Vector3(-20 + 5 * i, -15, -20),
                    controlMap: controlMaps[i],
                    skin: playersSkins[i] ?? 'ZombieA',
                    name: 'Player ' + String(i + 1)
                })
            );
            this.add(this.players[i]);
        }

        // Prepare CPUs
        const hpLevels = [40, 50, 60];
        const aiHp = hpLevels[cpuLevel];

        for (let i = 0; i < totalCpu; i++) {
            this.cpu.push(
                new CharacterAi(this, {
                    position: new THREE.Vector3(0 + 5 * i, -15, -20),
                    skin: cpuSkins[i] ?? 'ZombieA',
                    hp: aiHp,
                    name: 'CPU ' + String(i + 1)
                })
            );
            this.add(this.cpu[i]);
        }

        // Prepare item spawner
        this.itemSpawner = new ItemSpawner(this, {
            active: itemsOn
        });
    }

    onKeyPressed(key, repeat) {
        super.onKeyPressed(key, repeat);

        if (key.toLowerCase() === 'enter') {
            this.pauseGame();
        }
    }

    onUpdate(dt) {
        if (!this.pause) {
            this.itemSpawner.onUpdate(dt);
            super.onUpdate(dt);
        }
        GameManager.onUpdate(dt);
    }

    pauseGame() {
        this.pause = !this.pause;
        document.getElementById('winMenu').style.visibility = this.pause ? 'visible' : 'hidden';
    }
}