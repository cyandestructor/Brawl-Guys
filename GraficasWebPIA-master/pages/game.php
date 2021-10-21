<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>

		<?php
		//Esta dirección es de mi local, pueden cambiarla a su conveniencia.
		$link = "http://localhost/GraficasWebPIA/GraficasWebPIA-master/";
		?>
	</head>
	<script src="<?php echo $link; ?>js/jquery-3.6.0.min.js"></script>
	<script src="<?php echo $link; ?>js/three.js"></script>
	<script src="<?php echo $link; ?>js/FBXLoader.js"></script>
	<script src="<?php echo $link; ?>js/GLTFLoader.js"></script>
	<script src="<?php echo $link; ?>js/MTLLoader.js"></script>
	<script src="<?php echo $link; ?>js/OBJLoader.js"></script>
	<script src="<?php echo $link; ?>js/fflate.min.js"></script>
	
	<!-- <script src="<?php echo $link; ?>js/animation/AnimationMixer.js"></script>-->

	<!--<script src="https://unpkg.com/three"></script>
	<script scr="https://unpkg.com/three/examples/jsm/libs/fflate.min.js"></script>
	<script scr="https://unpkg.com/fflate"></script>
	<script src="https://cdn.jsdelivr.net/npm/fflate/umd/index.js"></script>
    <script src="https://unpkg.com/three/examples/js/loaders/FBXLoader.js"></script>-->

	<script type="text/javascript">

		var scene;
		var renderer;
		var camera;

		var clock;
		var delta;

		var mixers = [];
		var action1, action2, action3, action4;

		var KEYS = {};
		var flag = false;

		var punch = false;
		var kick = false;

		$(document).ready(function(){

			clock = new THREE.Clock();

			var canvasSize = {
				width: window.innerWidth,
				height: window.innerHeight
			}

			renderer = new THREE.WebGLRenderer();

			renderer.setClearColor( new THREE.Color(1,1,1));

			renderer.setSize(
				canvasSize.width,
				canvasSize.height);

			camera = new THREE.PerspectiveCamera(
				90,
				canvasSize.width / canvasSize.height,
				0.1,
				200
			);

			scene = new THREE.Scene();

			$("#scene-section").append(renderer.domElement);

			var ambient = new THREE.AmbientLight(
				new THREE.Color(1,1,1),
				1.0);

			var directional = new THREE.DirectionalLight(
				new THREE.Color(1,1,1),
				0.2);

			directional.position.set(0,0,1);

			scene.add(ambient);
			scene.add(directional);

			var mapa1 = new THREE.FBXLoader();
			mapa1.load('<?php echo $link; ?>models/maps/mapaMine2.fbx', function(mapa1){
				
				mapa1.position.x = 0;
				mapa1.position.y = -20;
				mapa1.position.z = -60;
				mapa1.scale.set(0.045, 0.04, 0.025);
				scene.add(mapa1);
			});

			var loader = new THREE.FBXLoader();
			loader.load('<?php echo $link; ?>models/GameExports/IdleWalkPunchKickMaya.fbx', function (personaje){
				personaje.mixer = new THREE.AnimationMixer(personaje);

				mixers.push(personaje.mixer);
				action1 = personaje.mixer.clipAction(personaje.animations[0]);
				action2 = personaje.mixer.clipAction(personaje.animations[1]);
				action3 = personaje.mixer.clipAction(personaje.animations[2]);
				action4 = personaje.mixer.clipAction(personaje.animations[3]);

				action2.startAt(1.0666667222976685);
				action3.startAt(2.133333444595337);
				action4.startAt(2.933333396911621);

				action1.play();
				action2.play();
				action3.play();
				action4.play();

				personaje.position.x = 0;
				personaje.position.y = -15;
				personaje.position.z = -20;

				personaje.rotation.y = -1.5;

				personaje.scale.set(0.03,0.03,0.03);

				personaje.name = 'Zombie';

				scene.add(personaje);

			});
				
			render();

		});

		$(document).on("keydown", function(evt){
				KEYS[String.fromCharCode(evt.which)] = true;
		});

		$(document).on("keyup", function(evt){
			var key = String.fromCharCode(evt.which);
			KEYS[key] = false;
		});

			function render(){

			requestAnimationFrame(render);

			delta = clock.getDelta();

			if(mixers.length > 0){
				for(var i = 0; i < mixers.length; i++){
					mixers[i].update(delta);
				}
				if(flag){
					if(action2.time < 1.0666667222976685){
						action2.startAt(1.0666667222976685);
					}
					action1.weight = 0;
					action2.weight = 1;
					action3.weight = 0;
					action4.weight = 0;
					flag = false;
				}
				else if(!flag){
					action1.weight = 1;
					action2.weight = 0;
					action3.weight = 0;
					action4.weight = 0;
				}

				if(punch){
					if(action3.time < 2.133333444595337){
						action3.startAt(2.133333444595337);
					}
					action1.weight = 0;
					action2.weight = 0;
					action3.weight = 1;
					action4.weight = 0;
					punch = false;
				}
				if(kick){
					if(action4.time < 2.933333396911621){
						action4.startAt(2.933333396911621);
					}
					action1.weight = 0;
					action2.weight = 0;
					action3.weight = 0;
					action4.weight = 1;
					kick = false;
				}
			}

			moverPersonaje(delta);

			renderer.render(scene, camera);
		}

		function moverPersonaje(delta){
			var movimiento = scene.getObjectByName('Zombie');
			if(KEYS["A"]){
				flag = true;
				movimiento.position.x -= 15*delta;
				movimiento.rotation.y = -1.5;
				}

			if(KEYS["D"]){
				flag = true;
				movimiento.position.x += 15*delta;
				movimiento.rotation.y = 1.5;
				}
			if(KEYS["Q"]){
				punch = true;
			}
			if(KEYS["E"]){
				kick = true;
			}
		}


		/*function moverPersonaje(delta){
			var movimiento = scene.getObjectByName("Zombie");
			if(key == "W"){
				movimiento.position.x += 25*delta;
				key = 0;
			}
			if(key == "S"){
				movimiento.position.x -= 25*delta;
				key = 0;
			}
		}*/

	</script>

	<body>
		<div id="scene-section"></div>
	</body>
</html>