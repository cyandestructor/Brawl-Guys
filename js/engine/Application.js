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
            this.onKeyDown(e.key);
        });

        document.addEventListener('keyup', (e) => {
            this.onKeyUp(e.key);
        });

        document.addEventListener('keypress', (e) => {
            this.onKeyPressed(e.key);
        });
    }

    onKeyDown(key) {
        Input.onKeyDown(key);
        if (this.scene) {
            this.scene.onKeyDown(key);
        }
    }

    onKeyPressed(key) {
        if (this.scene) {
            this.scene.onKeyPressed(key);
        }
    }

    onKeyUp(key) {
        Input.onKeyUp(key);
        if (this.scene) {
            this.scene.onKeyUp(key);
        }
    }
}