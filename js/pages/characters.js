import Application from "../engine/Application.js";
import CharacterSelectionScene from "../game/scenes/CharacterSelectionScene.js";
import Resources from "../engine/Resources.js";

let gScene;

document.addEventListener('DOMContentLoaded', () => {
    const resources = [
        {
            name: 'PlayerBase',
            type: 'model',
            path: '/models/characters/characterMedium.fbx'
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
        }
    ];

    Resources.loadResources(resources).then(() => {
        const app = new Application();

        const canvas = document.getElementById('character-canvas');

        gScene = new CharacterSelectionScene(canvas);

        app.prepare();

        app.setScene(gScene);

        app.run();
    });
});

const characterSkins = [
    'ZombieA',
    'AlienA',
    'RobotA'
];

let gSkinIndex = 0;

document.getElementById('prev-btn').addEventListener('click', (e) => {
    gSkinIndex--;
    if (gSkinIndex < 0) {
        gSkinIndex = characterSkins.length - 1;
    }

    gScene.setCharacterSkin(characterSkins[gSkinIndex]);
});

document.getElementById('next-btn').addEventListener('click', (e) => {
    gSkinIndex++;
    if (gSkinIndex > characterSkins.length - 1) {
        gSkinIndex = 0;
    }

    gScene.setCharacterSkin(characterSkins[gSkinIndex]);
});