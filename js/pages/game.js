import Application from "../engine/Application.js";
import FightScene from "../game/scenes/FightScene.js";
import Resources from "../engine/Resources.js";

document.addEventListener('DOMContentLoaded', () => {
    // Ahora se pueden registrar las direcciones de los recursos en un almacén
    // de recursos y obtenerlos después a través de la llave (primer parámetro)
    const resources = [
        {
            name: 'MapOne',
            type: 'model',
            path: '/models/maps/piratas-map.fbx'
        },
        {
            name: 'MapTwo',
            type: 'model',
            path: '/models/maps/navidad-map.fbx'
        },
        {
            name: 'MapThree',
            type: 'model',
            path: '/models/maps/minecraft-map.fbx'
        },
        {
            name: 'MapFour',
            type: 'model',
            path: '/models/maps/espacio-map.fbx'
        },
        {
            name: 'PlayerBase',
            type: 'model',
            path: '/models/characters/characterMedium.fbx'
        },
        {
            name: 'AstroGun',
            type: 'model',
            path: '/models/items/astroGun.fbx'
        },
        {
            name: 'Sword',
            type: 'model',
            path: '/models/items/sword.fbx'
        },
        {
            name: 'Shield',
            type: 'model',
            path: '/models/items/shield.fbx'
        },
        {
            name: 'ZombieA',
            type: 'texture',
            path: '/models/characters/skins/zombieA.png'
        },
        {
            name: 'RobotA',
            type: 'texture',
            path: '/models/characters/skins/robot.png'
        },
        {
            name: 'AlienA',
            type: 'texture',
            path: '/models/characters/skins/alienA.png'
        },
        {
            name: 'CharacterIdle',
            type: 'animation',
            path: '/models/animations/idle.fbx'
        },
        {
            name: 'CharacterWalk',
            type: 'animation',
            path: '/models/animations/walk.fbx'
        },
        {
            name: 'CharacterPunch',
            type: 'animation',
            path: '/models/animations/punch.fbx'
        },
        {
            name: 'CharacterKick',
            type: 'animation',
            path: '/models/animations/kick.fbx'
        },
        {
            name: 'CharacterJump',
            type: 'animation',
            path: '/models/animations/jump.fbx'
        },
        {
            name: 'CharacterDeath',
            type: 'animation',
            path: '/models/animations/death.fbx'
        },
        {
            name: 'CharacterBlock',
            type: 'animation',
            path: '/models/animations/block.fbx'
        },
        {
            name: 'CharacterShoot',
            type: 'animation',
            path: '/models/animations/shoot.fbx'
        },
        {
            name: 'CharacterAttack',
            type: 'animation',
            path: '/models/animations/attack.fbx'
        },
        {
            name: 'CharacterShield',
            type: 'animation',
            path: '/models/animations/shield.fbx'
        },
        {
            name: 'CharacterSpecialPunch',
            type: 'animation',
            path: '/models/animations/special-punch.fbx'
        },
        {
            name: 'CharacterSpecialKick',
            type: 'animation',
            path: '/models/animations/special-kick.fbx'
        },
        {
            name: 'Laser',
            type: 'audio',
            path: '/media/sounds/laser.wav'
        },
        {
            name: 'PunchA',
            type: 'audio',
            path: '/media/sounds/punch-a.wav'
        },
        {
            name: 'PunchB',
            type: 'audio',
            path: '/media/sounds/punch-b.wav'
        },
        {
            name: 'SwordA',
            type: 'audio',
            path: '/media/sounds/sword-a.wav'
        },
        {
            name: 'SwordB',
            type: 'audio',
            path: '/media/sounds/sword-b.wav'
        },
        {
            name: 'PickUp',
            type: 'audio',
            path: '/media/sounds/pickup.wav'
        },
        {
            name: 'Spark',
            type: 'audio',
            path: '/media/sounds/spark.wav'
        },
        {
            name: 'SnowMusic',
            type: 'audio',
            path: '/media/sounds/music/snow.mp3'
        },
        {
            name: 'MinecraftMusic',
            type: 'audio',
            path: '/media/sounds/music/minecraft.mp3'
        },
        {
            name: 'PiratesMusic',
            type: 'audio',
            path: '/media/sounds/music/pirates.mp3'
        },
        {
            name: 'SpaceMusic',
            type: 'audio',
            path: '/media/sounds/music/space.mp3'
        },
        {
            name: 'Particle',
            type: 'texture',
            path: '/media/images/particle.png'
        },
        {
            name: 'DaySkybox',
            type: 'cubemap',
            path: '/models/maps/skyboxes/day/',
            images: [
                'px.png',
                'nx.png',
                'py.png',
                'ny.png',
                'pz.png',
                'nz.png'
            ]
        },
        {
            name: 'EveningSkybox',
            type: 'cubemap',
            path: '/models/maps/skyboxes/evening/',
            images: [
                'px.png',
                'nx.png',
                'py.png',
                'ny.png',
                'pz.png',
                'nz.png'
            ]
        },
        {
            name: 'SunsetSkybox',
            type: 'cubemap',
            path: '/models/maps/skyboxes/sunset/',
            images: [
                'px.png',
                'nx.png',
                'py.png',
                'ny.png',
                'pz.png',
                'nz.png'
            ]
        }
    ];

    Resources.loadResources(resources).then(() => {
        document.getElementById('loader').style.display = 'none';

        // La clase Application controla todo el flujo de la aplicación
        const app = new Application();

        // Se pueden crear escenas independientes. Todo el código relacionado a una escena
        // se ubica únicamente en su propio archivo. Ver el archivo js/game/scenes/FightScene.js
        const fightScene = new FightScene({
            id: "scene-section",
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Se prepara la aplicación
        app.prepare();

        // Se especifica la escena principal de la aplicación (la que se va a renderizar y actualizar)
        app.setScene(fightScene);

        // Se inicia la aplicación. Esto inicia la escena y comienza el game loop.
        app.run();
    });
});