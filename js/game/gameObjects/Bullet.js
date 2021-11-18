import GameObject from "../../engine/GameObject.js";

export default class Bullet extends GameObject {

    static baseBullet;

    direction;
    speed;

    constructor(scene, position, direction, props = {}) {
        super(scene);
        this.speed = props['speed'] ?? 30;
        this.direction = direction;

        if (!Bullet.baseBullet) {
            const geometry = new THREE.SphereGeometry( 0.5, 8, 8 );
            const material = new THREE.MeshBasicMaterial( { color: 0xFFDA00 } );
            Bullet.baseBullet = new THREE.Mesh( geometry, material );
        }

        this.handler = Bullet.baseBullet.clone();
        this.handler.position.copy(position);
    }

    onUpdate(dt) {
        this.handler.position.x += this.speed * this.direction * dt;
    }

}