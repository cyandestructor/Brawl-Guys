import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class Shield extends GameObject {
    
    constructor(scene, props = {}) {
        super(scene);

        this.initModel(props);
    }

    initModel(props) {
        const original = Resources.getModelResource('Shield');
        const object = original.clone();
        
        const pivot = new THREE.Group();
        pivot.scale.set(0.03, 0.03, 0.03);
        pivot.add(object);

        if (props.position) {
            pivot.position.copy(props.position);
        }

        this.handler = pivot;
    }
    
    onUpdate(dt) {

    }
}