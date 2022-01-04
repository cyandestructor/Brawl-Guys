// Players Widget
const MAX_PLAYERS = 3;
let gTotalPlayers = 0;

document.getElementById('decrease-players-btn').addEventListener('click', (e) => {
    gTotalPlayers--;
    gTotalPlayers = Math.max(gTotalPlayers, 0);

    document.getElementById('total-players-txt').innerText = gTotalPlayers;
});

document.getElementById('increase-players-btn').addEventListener('click', (e) => {
    gTotalPlayers++;
    gTotalPlayers = Math.min(gTotalPlayers, MAX_PLAYERS);

    document.getElementById('total-players-txt').innerText = gTotalPlayers;
});

// CPU Widget
const MAX_CPU = 3;
let gTotalCpu = 0;

document.getElementById('decrease-cpu-btn').addEventListener('click', (e) => {
    gTotalCpu--;
    gTotalCpu = Math.max(gTotalCpu, 0);

    document.getElementById('total-cpu-txt').innerText = gTotalCpu;
});

document.getElementById('increase-cpu-btn').addEventListener('click', (e) => {
    gTotalCpu++;
    gTotalCpu = Math.min(gTotalCpu, MAX_CPU);

    document.getElementById('total-cpu-txt').innerText = gTotalCpu;
});

// CPU Level Widget
const CpuLevel = {
    EASY: 1,
    NORMAL: 2,
    HARD: 3
};

let gCpuLevel = 2;

function displayCpuLevel() {
    let cpuLevelText = '';
    switch (gCpuLevel) {
        case CpuLevel.EASY:
            cpuLevelText = 'Easy';
            break;
        case CpuLevel.NORMAL:
            cpuLevelText = 'Normal';
            break;
        case CpuLevel.HARD:
            cpuLevelText = 'Hard';
            break;
    }

    document.getElementById('cpu-level-txt').innerText = cpuLevelText;
}

document.getElementById('decrease-cpu-level-btn').addEventListener('click', (e) => {
    gCpuLevel--;
    gCpuLevel = Math.max(gCpuLevel, CpuLevel.EASY);
    displayCpuLevel();
});

document.getElementById('increase-cpu-level-btn').addEventListener('click', (e) => {
    gCpuLevel++;
    gCpuLevel = Math.min(gCpuLevel, CpuLevel.HARD);
    displayCpuLevel();
});

// Items Widget

let gItemsOn = true;

const itemsWidgetBtns = document.getElementsByClassName('items-active-btn');

for (let i = 0; i < itemsWidgetBtns.length; i++) {
    const element = itemsWidgetBtns[i];
    element.addEventListener('click', (e) => {
        gItemsOn = !gItemsOn;

        document.getElementById('items-active-txt').innerText = gItemsOn ? 'On' : 'Off';
    });
}

// Accept button

function saveGameSettings() {
    const gameSettings = {
        players: gTotalPlayers,
        cpu: gTotalCpu,
        cpuLevel: gCpuLevel,
        items: gItemsOn
    };

    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
}

document.getElementById('accept-btn').addEventListener('click', (e) => {
    const button = e.currentTarget;

    // At least two characters
    if (gTotalPlayers + gTotalCpu >= 2) {
        saveGameSettings();
        location.href = '/pages/characters.html';
    }
    else {
        button.disabled = true;
        document.getElementById('error-container').innerText = 'Invalid number of Players and CPUs';

        setTimeout(() => {
            button.disabled = false;
            document.getElementById('error-container').innerText = '';
        }, 1500);
    }
});