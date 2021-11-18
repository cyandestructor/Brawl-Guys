import Item from "./Item.js";
import Resources from "../../engine/Resources.js";
import Character from "./Character.js";
import PickableItem from "./PickableItem.js";
import Bullet from "./Bullet.js";

export default class AstroGun extends PickableItem {

    muzzle;

    constructor(scene, props = {}) {
        super(scene, props.pickedUp ?? false);

        this.initModel(props);
        this.updateFloorY();
    }

    initModel(props) {
        const original = Resources.getModelResource('AstroGun');
        const object = original.clone();

        this.muzzle = new THREE.Object3D();
        this.muzzle.position.y = 10;
        this.muzzle.position.z = 100;
        object.add(this.muzzle);
        
        const pivot = new THREE.Group();
        pivot.rotation.y = THREE.Math.degToRad(90);
        pivot.scale.set(0.03, 0.03, 0.03);
        pivot.add(object);
        object.position.y = 20;

        if (props.position) {
            pivot.position.copy(props.position);
        }

        this.handler = pivot;
    }

    getActionCharacterState() {
        return Character.State.Shoot;
    }

    getType() {
        return Item.Type.Attack;
    }
    
    onUpdate(dt) {
        if (!this.pickedUp) {
            this.updateGravity(dt);
            if (this.pickUpCooldown <= 0) {
                this.checkForInteraction();
            }
        }
        super.onUpdate(dt);
    }

    shoot(direction = 1) {
        const muzzlePosition = new THREE.Vector3();
        this.muzzle.getWorldPosition(muzzlePosition);
        this.scene.add(new Bullet(this.scene, muzzlePosition, direction));
    }

    onInteraction(triggerObject) {
        this.handler.position.set(0, 0, 0);
        this.handler.children[0].position.set(0, 0, 0);
        this.handler.rotation.set(0, 0, 0);
        triggerObject.setCurrentItem(this);
        super.onInteraction();
    }

    onDrop(position) {
        this.scene.addNative(this.handler);
        this.handler.rotation.y = THREE.Math.degToRad(90);
        this.handler.position.copy(position);
        this.handler.children[0].position.y = 20;
        super.onDrop(position);
    }
}