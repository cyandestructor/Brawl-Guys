import Application from "../engine/Application.js";
import CharacterSelectionScene from "../game/scenes/CharacterSelectionScene.js";
import Resources from "../engine/Resources.js";

let gScene;

document.addEventListener('DOMContentLoaded', () => {
    getGameSettings();
    showCharacterName();

    const resources = [
        {
            name: 'PlayerBase',
            type: 'model',
            path: '/Brawl-Guys/models/characters/characterMedium.fbx'
        },
        {
            name: 'ZombieA',
            type: 'texture',
            path: '/Brawl-Guys/models/characters/skins/zombieA.png'
        },
        {
            name: 'RobotA',
            type: 'texture',
            path: '/Brawl-Guys/models/characters/skins/robot.png'
        },
        {
            name: 'AlienA',
            type: 'texture',
            path: '/Brawl-Guys/models/characters/skins/alienA.png'
        },
        {
            name: 'CharacterIdle',
            type: 'animation',
            path: '/Brawl-Guys/models/animations/idle.fbx'
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

let gTotalPlayers = 0;
let gTotalCpu = 0;
let gPlayerIndex = 0;
let gCpuIndex = 0;

function getGameSettings() {
    const gameSettings = JSON.parse(localStorage.getItem('gameSettings') ?? '{}');

    gTotalPlayers = gameSettings.players;
    gTotalCpu = gameSettings.cpu;
}

function showCharacterName() {
    if (gPlayerIndex < gTotalPlayers) {
        document.getElementById('character-name-container').innerText = 'Player ' + String(gPlayerIndex + 1);
    }
    else if (gCpuIndex < gTotalCpu) {
        document.getElementById('character-name-container').innerText = 'CPU ' + String(gCpuIndex + 1);
    }
    else {
        document.getElementById('character-name-container').innerText = 'Character';
    }
}

function saveCharacterInfo() {
    if (gPlayerIndex < gTotalPlayers) {
        const players = JSON.parse(localStorage.getItem('players') ?? '{}');
        players[gPlayerIndex] = characterSkins[gSkinIndex];

        localStorage.setItem('players', JSON.stringify(players));

        gPlayerIndex++;
    }
    else if(gCpuIndex < gTotalCpu) {
        const cpu = JSON.parse(localStorage.getItem('cpu') ?? '{}');
        cpu[gCpuIndex] = characterSkins[gSkinIndex];

        localStorage.setItem('cpu', JSON.stringify(cpu));

        gCpuIndex++;
    }
    
    if (gPlayerIndex >= gTotalPlayers && gCpuIndex >= gTotalCpu) {
        location.href = '/Brawl-Guys/pages/maps.html';
    }
    else {
        showCharacterName();
    
        gSkinIndex = 0;
        gScene.setCharacterSkin(characterSkins[gSkinIndex]);   
    }
}

document.getElementById('accept-btn').addEventListener('click', (e) => {
    saveCharacterInfo();
});