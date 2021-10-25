import GameObject from "../../engine/GameObject.js";
import Input from "../../engine/Input.js";
import Resources from "../../engine/Resources.js";

// Todos los objetos extienen la clase GameObject
// Este diseño permite tener objetos que manejen su propia lógica
// de esta forma aislamos el código de cada objeto en su propio
// archivo y además podemos crear tantas instancias como necesitemos en la escena
export default class Character extends GameObject {
    mixer;
    actions = {};

    speed;
    controlMap;

    static State = {
        Idle: 'idle',
        Walk: 'walk',
        Punch: 'punch',
        Kick: 'kick'
    };

    lastState = Character.State.Idle;
    currentState = Character.State.Idle;

    // Los GameObject reciben una referencia a la escena a la que pertenecen (scene)
    constructor(scene, props) {
        super(scene); // Importante para inicializar el GameObject correctamente
        this.speed = props.speed ?? 15;

        this.controlMap = props.controlMap ?? {
            right: "D",
            left: "A",
            up: "",
            down: "",
            punch: "Q",
            kick: "E"
        }

        this.initModel(props);

        if (props.skin) {
            this.setSkin(props.skin);
        }

        this.loadAnimations();
    }

    onUpdate(dt) {
        if(!this.handler) {
            return;
        }

        this.moveCharacter(dt);

        this.updateStateMachine(dt);
    }

    moveCharacter(dt) {
        let canMove = true;
        this.currentState = Character.State.Idle;

        if(Input.keyIsDown(this.controlMap.punch)){
            this.currentState = Character.State.Punch;
            canMove = false;
        }

        if(Input.keyIsDown(this.controlMap.kick)){
            this.currentState = Character.State.Kick;
            canMove = false;
        }

        if (canMove) {
            if(Input.keyIsDown(this.controlMap.left)){
                this.handler.position.x -= this.speed * dt;
                this.handler.rotation.y = -1.5;
                this.currentState = Character.State.Walk;
            }
    
            if(Input.keyIsDown(this.controlMap.right)){
                this.handler.position.x += this.speed * dt;
                this.handler.rotation.y = 1.5;
                this.currentState = Character.State.Walk;
            }
        }
    }

    initModel(props) {
        const original = Resources.getModelResource('PlayerBase');
        const object = THREE.SkeletonUtils.clone(original);
        //object.animations = original.animations;
        if (props.position) {
            object.position.copy(props.position);
        }

        object.rotation.y = -1.5;
        object.scale.set(0.03, 0.03, 0.03);
        
        this.handler = object; // El handler nos permite tener siempre una referencia al objeto de Three.js para modificarlo

        this.scene.add(this);
    }

    loadAnimations() {
        this.mixer = new THREE.AnimationMixer(this.handler);

        const idle = Resources.getAnimationResource('CharacterIdle');
        this.actions['idle'] = this.mixer.clipAction(idle.animations[0]);
        
        const walk = Resources.getAnimationResource('CharacterWalk');
        this.actions['walk'] = this.mixer.clipAction(walk.animations[0]);
        
        const kick = Resources.getAnimationResource('CharacterKick');
        this.actions['kick'] = this.mixer.clipAction(kick.animations[1]);

        const punch = Resources.getAnimationResource('CharacterPunch');
        this.actions['punch'] = this.mixer.clipAction(punch.animations[0]);

        const jump = Resources.getAnimationResource('CharacterJump');
        this.actions['jump'] = this.mixer.clipAction(jump.animations[0]);

        this.actions[this.currentState].play();
    }

    setSkin(skin) {
        const texture = Resources.getTextureResource(skin);
        if (texture) {
            const mesh = this.handler.getObjectByName('characterMedium');
            mesh.material = new THREE.MeshLambertMaterial({
                map: texture
            });
        }
    }

    updateStateMachine(dt) {
        this.mixer.update(dt);

        if (this.lastState != this.currentState) {
            const fadeTime = 0.2;
            const lastAction = this.actions[this.lastState];
            const currentAction = this.actions[this.currentState];

            lastAction.reset();
            currentAction.reset();

            lastAction.crossFadeTo(currentAction, fadeTime).play();

            this.lastState = this.currentState;
        }
    }
}