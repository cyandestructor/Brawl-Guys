<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>

	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/icon.png"/>

	<link rel="stylesheet" href="<?php echo $link; ?>css/design.css"/>
	<link rel="stylesheet" href="<?php echo $link; ?>css/mapscss.css"/>

	<title>Maps</title>

	<script src="<?php echo $link; ?>js/lib/jquery-3.6.0.min.js"></script>

<script type="text/javascript">

var counter = 1;

$(document).ready(function() {

	$("#btnAdelante").click(function(){
		counter++;
		if(counter>4){
			counter=1;
		}
		$("#map").attr("src","http://localhost:8080/GW/GraficasWebPIA/media/images/mapas/"+counter+".jpg");
	});

	$("#btnAtras").click(function(){
		counter--;
		if(counter<1){
			counter=4;
		}
		$("#map").attr("src","http://localhost:8080/GW/GraficasWebPIA/media/images/mapas/"+counter+".jpg");		
	});

	$("#btnAceptar2").click(function(){
		console.log(counter);
		counter=counter;
		switch (counter) {
			case 1:
				localStorage.setItem('map', 'MapOne');
				break;
			case 2:
				localStorage.setItem('map', 'MapTwo');
				break;
			case 3:
				localStorage.setItem('map', 'MapThree');
				break;
			case 4:
				localStorage.setItem('map', 'MapOne');
				break;
		}
	});
});
</script> 
</head>

<body>
	<?php session_start(); ?>
			<div class="containerS">
				<img src="<?php echo $link; ?>media/images/select_map/GAME UI-05.png" alt="Italian Trulli">

				<img src="<?php  echo $link; ?>media/images/select_map/GAME UI-51.png" alt="Italian Trulli" id="btnAtras">

				<img src="<?php echo $link; ?>media/images/mapas/1.jpg" alt="Italian Trulli" id="map">
				
				<button id="btnAceptar2"><a href="<?php echo $link; ?>pages/gamemode.php"><img src="<?php  echo $link; ?>media/images/select_map/GAME UI-53.png" alt="Italian Trulli" id="btnAceptar"></a></button>

				<img src="<?php  echo $link; ?>media/images/select_map/GAME UI-52.png" alt="Italian Trulli" id="btnAdelante">
			</div>
	
	<img class="ui" src="<?php echo $link; ?>media/images/settings/GAME UI-16.png" alt="Italian Trulli">

	<script src="<?php echo $link; ?>js/pages/maps.js"></script>
</body>
</html>