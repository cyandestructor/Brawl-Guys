import Input from "./Input.js";

export default class Application {
    static instance;

    scene;
    clock;

    constructor() {
        this.clock = new THREE.Clock();
    }

    prepare() {
        this.bindEvents();
    }

    setScene(scene) {
        this.scene = scene;
    }

    run() {
        if (this.scene) {
            this.scene.onStart();
        }
        
        this.update();
    }

    update() {
        requestAnimationFrame(() => this.update());

        const dt = this.clock.getDelta();

        if (this.scene) {
            this.scene.onUpdate(dt);
            this.scene.render();
        }
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            this.onKeyDown(e.key, e.repeat);
        });

        document.addEventListener('keyup', (e) => {
            this.onKeyUp(e.key, e.repeat);
        });

        document.addEventListener('keypress', (e) => {
            this.onKeyPressed(e.key, e.repeat);
        });

        window.addEventListener('resize', () => {
            this.onWindowResize(window.innerWidth, window.innerHeight);
        });
    }

    onKeyDown(key, repeat) {
        Input.onKeyDown(key);
        if (this.scene) {
            this.scene.onKeyDown(key, repeat);
        }
    }

    onKeyPressed(key, repeat) {
        if (this.scene) {
            this.scene.onKeyPressed(key, repeat);
        }
    }

    onKeyUp(key, repeat) {
        Input.onKeyUp(key);
        if (this.scene) {
            this.scene.onKeyUp(key, repeat);
        }
    }

    onWindowResize(width, height) {
        if (!this.scene) {
            return;
        }

        const canvas = this.scene.getRenderer().domElement;
        const bcr = canvas.getBoundingClientRect();
        const canvasWidth = bcr.width;
        const canvasHeight = bcr.height;

        const camera = this.scene.getCamera();
        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();

        this.scene.getRenderer().setSize(canvasWidth, canvasHeight);
    }
}