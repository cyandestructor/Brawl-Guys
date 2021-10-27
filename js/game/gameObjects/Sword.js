import Item from "./Item.js";
import Resources from "../../engine/Resources.js";
import Character from "./Character.js";

export default class Sword extends Item {
    
    constructor(scene, props = {}) {
        super(scene);

        this.initModel(props);
    }

    initModel(props) {
        const original = Resources.getModelResource('Sword');
        const object = original.clone();
        
        const pivot = new THREE.Group();
        pivot.scale.set(0.03, 0.03, 0.03);
        pivot.rotation.y = THREE.Math.degToRad(90);
        pivot.add(object);

        if (props.position) {
            pivot.position.copy(props.position);
        }

        this.handler = pivot;
    }
    
    getActionCharacterState() {
        return Character.State.Attack;
    }

    getType() {
        return Item.Type.Attack;
    }

    onUpdate(dt) {

    }
}