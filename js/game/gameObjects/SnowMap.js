import GameObject from "../../engine/GameObject.js";
import Resources from "../../engine/Resources.js";

export default class SnowMap extends GameObject {

    constructor(scene) {
        super(scene);

        const mapa = Resources.getModelResource('MapTwo').clone();

        mapa.position.x = 20;
        mapa.position.y = -25;
        mapa.position.z = -60;
        mapa.scale.multiplyScalar(0.15);

        this.handler = mapa;
    }

}