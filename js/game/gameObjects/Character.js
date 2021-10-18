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

        var loader = new THREE.FBXLoader();
        loader.load(Resources.getModelPath('Zombie'), (object) => {
            if (props.position) {
                object.position.copy(props.position);
            }

            object.rotation.y = -1.5;
            object.scale.set(0.03, 0.03, 0.03);
            
            object.mixer = new THREE.AnimationMixer(object);

            this.action1 = object.mixer.clipAction(object.animations[0]);
            this.action2 = object.mixer.clipAction(object.animations[1]);
            this.action3 = object.mixer.clipAction(object.animations[2]);
            this.action4 = object.mixer.clipAction(object.animations[3]);

            this.action2.startAt(1.0666667222976685);
            this.action3.startAt(2.133333444595337);
            this.action4.startAt(2.933333396911621);

            this.action1.play();
            this.action2.play();
            this.action3.play();
            this.action4.play();

            object.name = 'Zombie';

            this.handler = object; // El handler nos permite tener siempre una referencia al objeto de Three.js para modificarlo

            this.scene.add(this);
        });
    }

    onUpdate(dt) {
        if(!this.handler) {
            return;
        }

        this.handler.mixer.update(dt);

        if(this.flag){
            if(this.action2.time < 1.0666667222976685){
                this.action2.startAt(1.0666667222976685);
            }
            this.action1.weight = 0;
            this.action2.weight = 1;
            this.action3.weight = 0;
            this.action4.weight = 0;
            this.flag = false;
        }
        else {
            this.action1.weight = 1;
            this.action2.weight = 0;
            this.action3.weight = 0;
            this.action4.weight = 0;
        }

        if(this.punch){
            if(this.action3.time < 2.133333444595337){
                this.action3.startAt(2.133333444595337);
            }
            this.action1.weight = 0;
            this.action2.weight = 0;
            this.action3.weight = 1;
            this.action4.weight = 0;
            this.punch = false;
        }

        if(this.kick){
            if(this.action4.time < 2.933333396911621){
                this.action4.startAt(2.933333396911621);
            }
            this.action1.weight = 0;
            this.action2.weight = 0;
            this.action3.weight = 0;
            this.action4.weight = 1;
            this.kick = false;
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
}