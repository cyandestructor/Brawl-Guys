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

    hp;
    attackPower;

    speed;
    jumpSpeed;
    
    gravityFactor;
    velocityY = 0;
    gravity = -9.8;

    // temp
    floorY;
    onGround = true;

    controlMap;

    hurtBox;
    hitBoxes = {};
    isHit = false;
    isBlock = false;
    isDeath = false;

    rightHandPivot;
    leftForeArmPivot;

    playerIndex;

    // Reference to all the characters in the game
    static totalPlayers = [];

    static State = {
        Idle: 'idle',
        Walk: 'walk',
        Punch: 'punch',
        Kick: 'kick',
        Jump: 'jump',
        Death: 'death',
        Damage: 'damage',
        Block: 'block',
        Shoot: 'shoot',
        Attack: 'attack',
        Shield: 'shield'
    };

    lastState = Character.State.Idle;
    currentState = Character.State.Idle;

    // Los GameObject reciben una referencia a la escena a la que pertenecen (scene)
    constructor(scene, props) {
        super(scene); // Importante para inicializar el GameObject correctamente
        this.speed = props.speed ?? 15;
        this.jumpSpeed = props.jumpSpeed ?? 30;
        this.hp = props.hp ?? 50;
        this.attackPower = props.attackPower ?? 5;

        this.gravityFactor = props.gravityFactor ?? 4;
        this.gravity *= this.gravityFactor;

        this.controlMap = props.controlMap ?? {
            right: "D",
            left: "A",
            up: "W",
            down: "S",
            punch: "Q",
            kick: "E",
            jump: " "
        }

        // Assign an index to this player based on the current total players
        this.playerIndex = Character.totalPlayers.length;

        this.initModel(props);

        if (props.skin) {
            this.setSkin(props.skin);
        }

        // temp
        this.floorY = this.handler.position.y;

        this.loadAnimations();

        // Add this character to the list
        Character.totalPlayers.push(this);
    }

    onUpdate(dt) {
        if(!this.handler) {
            return;
        }
        
        this.updateGravity(dt);
        
        if (!this.isDeath) {
            this.controlCharacter(dt);

            this.updateBoundingBoxes();

            this.updateCollisions(dt);
        }

        if (this.hp <= 0) {
            this.hp = 0;
            this.currentState = Character.State.Death;
            this.isDeath = true;
        }

        this.updateStateMachine(dt);
    }

    controlCharacter(dt) {
        let canMove = true;
        let canAttack = !this.isHit && this.onGround;
        this.resetCharacterState();

        if (canAttack) {
            if(Input.keyIsDown(this.controlMap.punch)){
                this.punch();
                canMove = false;
            }
    
            if(Input.keyIsDown(this.controlMap.kick)){
                this.kick();
                canMove = false;
            }
        }

        if (this.onGround && Input.keyIsDown(this.controlMap.down)) {
            this.currentState = Character.State.Block;
            this.isBlock = true;
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

        if (!this.onGround) {
            this.currentState = Character.State.Jump;
        }
    }

    initModel(props) {
        const original = Resources.getModelResource('PlayerBase');
        const object = THREE.SkeletonUtils.clone(original);

        if (props.position) {
            object.position.copy(props.position);
        }

        this.attachElementsToBones(object);

        object.rotation.y = -1.5;
        object.scale.set(0.03, 0.03, 0.03);
        
        this.handler = object; // El handler nos permite tener siempre una referencia al objeto de Three.js para modificarlo
    }

    attachElementsToBones(handler) {
        const rightHand = handler.getObjectByName('RightHandIndex1');
        const rightFoot = handler.getObjectByName('RightToes');
        const chest = handler.getObjectByName('Chest');
        const leftForeArm = handler.getObjectByName('LeftForeArm');

        // Preparing the right hand pivot to handle a weapon
        this.rightHandPivot = new THREE.Group();
        this.rightHandPivot.scale.set(0.3, 0.3, 0.3);
        this.rightHandPivot.rotateY(THREE.Math.degToRad(90));
        this.rightHandPivot.rotateX(THREE.Math.degToRad(-90));
        this.rightHandPivot.translateX(0.12);
        this.rightHandPivot.translateY(0.1);
        this.rightHandPivot.translateZ(0.1);
        rightHand.add(this.rightHandPivot);

        this.leftForeArmPivot = new THREE.Group();
        this.leftForeArmPivot.scale.set(0.3, 0.3, 0.3);
        this.leftForeArmPivot.rotateY(THREE.Math.degToRad(-90));
        this.leftForeArmPivot.rotateZ(THREE.Math.degToRad(-90));
        this.leftForeArmPivot.translateX(-0.15);
        this.leftForeArmPivot.translateY(0.1);
        this.leftForeArmPivot.translateZ(0.15);
        leftForeArm.add(this.leftForeArmPivot);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.5
        });
        const collisionBoxHelper = new THREE.Mesh( geometry, material );
        collisionBoxHelper.geometry.computeBoundingBox();
        collisionBoxHelper.visible = false;
        
        const punchBoxMesh = collisionBoxHelper.clone();
        punchBoxMesh.scale.multiplyScalar(0.5);

        const kickBoxMesh = collisionBoxHelper.clone();
        kickBoxMesh.scale.multiplyScalar(0.5);

        const hurtBoxMesh = collisionBoxHelper.clone();
        hurtBoxMesh.scale.set(0.75, 2.75, 0.75);
        hurtBoxMesh.position.y = 0.3;

        rightHand.add(punchBoxMesh);
        rightFoot.add(kickBoxMesh);
        chest.add(hurtBoxMesh);

        this.addHitBox('punch', punchBoxMesh);
        this.addHitBox('kick', kickBoxMesh);
        
        this.hurtBox = {
            mesh: hurtBoxMesh,
            box: new THREE.OBB()
        }
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

        const block = Resources.getAnimationResource('CharacterBlock');
        this.actions['block'] = this.mixer.clipAction(block.animations[0]);

        const shoot = Resources.getAnimationResource('CharacterShoot');
        this.actions['shoot'] = this.mixer.clipAction(shoot.animations[0]);

        const jump = Resources.getAnimationResource('CharacterJump');
        this.actions['jump'] = this.mixer.clipAction(jump.animations[0]);

        const shield = Resources.getAnimationResource('CharacterShield');
        this.actions['shield'] = this.mixer.clipAction(shield.animations[0]);

        const attack = Resources.getAnimationResource('CharacterAttack');
        this.actions['attack'] = this.mixer.clipAction(attack.animations[1]);

        const death = Resources.getAnimationResource('CharacterDeath');
        this.actions['death'] = this.mixer.clipAction(death.animations[0]);
        this.actions['death'].loop = THREE.LoopOnce;
        this.actions['death'].clampWhenFinished = true;

        const damageAnimationClip = death.animations[0].clone();
        damageAnimationClip.duration = 0.3;
        damageAnimationClip.trim();
        this.actions['damage'] = this.mixer.clipAction(damageAnimationClip);
        this.actions['damage'].timeScale = 0.9;
        this.actions['damage'].loop = THREE.LoopPingPong;

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

    updateGravity(dt) {
        this.velocityY += this.gravity * dt;
        this.handler.position.y += this.velocityY * dt;

        if (this.handler.position.y <= this.floorY) {
            this.handler.position.y = this.floorY;
            this.onGround = true;
            this.velocityY = 0;
        }
    }

    onKeyDown(key) {
        if (key == this.controlMap.jump && this.onGround) {
            this.velocityY = this.jumpSpeed;
            this.onGround = false;
        }
    }

    onKeyUp(key) {
        if (key == this.controlMap.jump && this.velocityY > this.jumpSpeed / 2) {
            this.velocityY = this.jumpSpeed / 2;
        }
    }

    onDamage(dt, damage = 0) {
        let totalDamage = damage;
        if (!this.isBlock) {
            this.currentState = Character.State.Damage;
            this.isHit = true;
        }
        else {
            totalDamage *= 0.3; // Damage reduction
            this.handler.translateZ(-2 * dt); // Knockback
        }
        
        this.hp -= totalDamage * dt;
        // console.log('Player ' + this.playerIndex + ' received a hit. Player HP: ' + this.hp);
    }

    updateCollisions(dt) {
        // Update collisions with other players
        for (const player of Character.totalPlayers) {
            if (player.playerIndex != this.playerIndex && !player.isDeath) {
                Object.keys(this.hitBoxes).forEach((key) => {
                    const hitbox = this.hitBoxes[key];
                    if (hitbox.active && hitbox.box.intersectsOBB(player.hurtBox.box)) {
                        player.onDamage(dt, this.attackPower);
                        // break; // Maybe needed
                    }
                });
            }
        }
    }

    updateBoundingBoxes() {
        Object.keys(this.hitBoxes).forEach((key) => {
            const hitbox = this.hitBoxes[key];
            hitbox.box.fromBox3(hitbox.mesh.geometry.boundingBox);
            hitbox.box.applyMatrix4(hitbox.mesh.matrixWorld);
        });

        this.hurtBox.box.fromBox3(this.hurtBox.mesh.geometry.boundingBox);
        this.hurtBox.box.applyMatrix4(this.hurtBox.mesh.matrixWorld);
    }

    addHitBox(key, hitBoxMesh) {
        this.hitBoxes[key] = {
            mesh: hitBoxMesh,
            box: new THREE.OBB(),
            active: false
        };
    }

    resetCharacterState() {
        if (!this.isHit) {
            this.currentState = Character.State.Idle;
        }
        this.isHit = false;
        this.isBlock = false;
        this.hitBoxes['punch'].active = false;
        this.hitBoxes['kick'].active = false;
        // this.hitBoxes['punch'].mesh.visible = false;
        // this.hitBoxes['kick'].mesh.visible = false;
    }

    punch() {
        this.currentState = Character.State.Punch;
        this.hitBoxes['punch'].active = true;
        // this.hitBoxes['punch'].mesh.visible = true;
    }

    kick() {
        this.currentState = Character.State.Kick;
        this.hitBoxes['kick'].active = true;
        // this.hitBoxes['kick'].mesh.visible = true;
    }
}