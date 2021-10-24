import GameObject from "../../engine/GameObject.js";
import Input from "../../engine/Input.js";
import Resources from "../../engine/Resources.js";

// Todos los objetos extienen la clase GameObject
// Este diseño permite tener objetos que manejen su propia lógica
// de esta forma aislamos el código de cada objeto en su propio
// archivo y además podemos crear tantas instancias como necesitemos en la escena
export default class Character extends GameObject {
    action1;
    action2;
    action3;
    action4;

    flag = false;
    punch = false;
    kick = false;

    speed;
    controlMap;
    
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
    }

    onUpdate(dt) {
        if(!this.handler) {
            return;
        }

        this.moveCharacter(dt);
    }

    moveCharacter(dt) {
        if(Input.keyIsDown(this.controlMap.left)){
            this.flag = true;
            this.handler.position.x -= this.speed * dt;
            this.handler.rotation.y = -1.5;
        }

        if(Input.keyIsDown(this.controlMap.right)){
            this.flag = true;
            this.handler.position.x += this.speed * dt;
            this.handler.rotation.y = 1.5;
        }

        if(Input.keyIsDown(this.controlMap.punch)){
            this.punch = true;
        }

        if(Input.keyIsDown(this.controlMap.kick)){
            this.kick = true;
        }
    }

    onKeyPressed(key) {
        console.log(this.speed); // Prueba
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
        
        console.log(object);
        this.handler = object; // El handler nos permite tener siempre una referencia al objeto de Three.js para modificarlo

        this.scene.add(this);
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
}