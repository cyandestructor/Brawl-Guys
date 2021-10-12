<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
		</style>

		<?php
		$link = "http://localhost:8080/GW/PIA_Test/";
		?>
	</head>
	<script src="<?php echo $link; ?>js/jquery-3.6.0.min.js"></script>
	<script src="<?php echo $link; ?>js/three.js"></script>
	<script src="<?php echo $link; ?>js/FBXLoader.js"></script>
	<script src="<?php echo $link; ?>js/GLTFLoader.js"></script>
	<script src="<?php echo $link; ?>js/MTLLoader.js"></script>
	<script src="<?php echo $link; ?>js/OBJLoader.js"></script>
	<script src="<?php echo $link; ?>js/fflate.min.js"></script>

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
		var action1, action2;

		var KEYS = {};
		var flag = false;

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
				75,
				canvasSize.width / canvasSize.height,
				0.1,
				100
			);

			scene = new THREE.Scene();

			$("#scene-section").append(renderer.domElement);

			var ambient = new THREE.AmbientLight(
				new THREE.Color(1,1,1),
				1.0);

			var directional = new THREE.DirectionalLight(
				new THREE.Color(1,1,1),
				0.4);

			directional.position.set(0,0,1);

			scene.add(ambient);
			scene.add(directional);

			var loader = new THREE.FBXLoader();
			loader.load('<?php echo $link; ?>models/GameExports/IdleWalkFixed.fbx', function (personaje){
				personaje.mixer = new THREE.AnimationMixer(personaje);

				mixers.push(personaje.mixer);
				action1 = personaje.mixer.clipAction(personaje.animations[1]);
				action2 = personaje.mixer.clipAction(personaje.animations[0]);

				action1.play();
				action2.play();

				personaje.position.x = 0;
				personaje.position.y = -15;
				personaje.position.z = -25;

				personaje.rotation.y = -1.5;

				personaje.scale.set(0.08,0.08,0.08);

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
					action1.weight = 0;
					action2.weight = 1;

					flag = false;
				}
				else{
					action1.weight = 1;
					action2.weight = 0;
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