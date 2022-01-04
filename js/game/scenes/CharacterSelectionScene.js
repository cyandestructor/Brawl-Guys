import Scene from "../../engine/Scene.js";
import Resources from "../../engine/Resources.js";

export default class CharacterSelectionScene extends Scene {

    mixer;
    character;

    constructor(canvas) {
        const bcr = canvas.getBoundingClientRect();

        const canvasWidth = bcr.width;
        const canvasHeight = bcr.height;

        const camera = new THREE.PerspectiveCamera (
            45,
            canvasWidth / canvasHeight,
            0.1,
            1000
        );
        camera.position.set(0, 5.5, 15);
        
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        });
		renderer.setClearColor( 0x000000, 0);
		renderer.setSize(canvasWidth, canvasHeight);

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

        this.addNative(ambient);
        this.addNative(directional);

        this.initModel();
        this.loadAnimations();
    }

    initModel() {
        const original = Resources.getModelResource('PlayerBase');
        this.character = THREE.SkeletonUtils.clone(original);
        this.character.scale.set(0.03, 0.03, 0.03);
        this.character.rotation.y = THREE.Math.degToRad(20);

        this.addNative(this.character);
        this.setCharacterSkin('ZombieA');
    }

    loadAnimations() {
        this.mixer = new THREE.AnimationMixer(this.character);

        const idle = Resources.getAnimationResource('CharacterIdle');
        this.mixer.clipAction(idle.animations[0]).play();
    }

    setCharacterSkin(skin) {
        const texture = Resources.getTextureResource(skin);
        if (texture) {
            const mesh = this.character.getObjectByName('characterMedium');
            mesh.material = new THREE.MeshLambertMaterial({
                map: texture
            });
        }
    }

    onUpdate(dt) {
        this.mixer.update(dt);
    }
}