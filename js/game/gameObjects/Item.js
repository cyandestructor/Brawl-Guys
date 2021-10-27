import GameObject from "../../engine/GameObject.js";
import Character from "./Character.js";

export default class Item extends GameObject {
    
    static Type = {
        None: 0,
        Defense: 1,
        Attack: 2
    };

    constructor(scene) {
        super(scene);
    }

    getActionCharacterState() {
        return Character.State.Idle;
    }

    getType() {
        return Item.Type.None;
    }
}