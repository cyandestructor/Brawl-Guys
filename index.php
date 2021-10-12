<!DOCTYPE html>
<html>
<head>
	<?php
		$link = "http://localhost:8080/GW/PIA_Test/";
	?>
	<link rel="shortcut icon" type="image" href="<?php echo $link; ?>media/images/ICON-31.png"/>

	 <link rel="stylesheet" href="css/design.css"/>
	<title>
		Brawl Guys
	</title>
</head>
<!--<body>
<img class="bg" src="bg.gif" alt="Italian Trulli">
</body>-->


	<body>


			<audio autoplay>
				<source src="<?php echo $link; ?>media/sounds/menum.mp3" type="audio/mp3">
			</audio>

			<div class="container">

				<img src="<?php echo $link; ?>media/images/GAME UI-01.png" alt="Italian Trulli">

				<a class="esUnA" href="<?php echo $link; ?>pages/play.php"><button id="btn">Button</button></a>

				<!--<a href="scoreboards.html"><button id="btn2">Button2</button></a>-->

				<a class="esUnA" href="<?php echo $link; ?>pages/scoreboards.php"><button id="btn3">Button3</button></a>

				<a class="esUnA" href="<?php echo $link; ?>pages/creditos.php"><button id="btn4">Button4</button></a>

			</div>

		<a href="<?php echo $link; ?>pages/settings.php"><img class="ui" src="<?php echo $link; ?>media/images/GAME UI-09.png" alt="Italian Trulli"></a>

		<img class="ui" src="<?php echo $link; ?>media/images/GAME UI-16.png" alt="Italian Trulli">


	</body>

</html>