<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
	?>
    <script src="<?php echo $link; ?>js/lib/jquery-3.6.0.min.js"></script>
</head>
<body>
    <?php
		$link = "http://localhost:8080/GW/GraficasWebPIA/";
        if(isset($_SESSION['userId'])){
            echo'<input type="hidden" class="inputUserId" name="userIdSession" value="'.$_SESSION['userId'].'">';
        }else{
            echo '<input type="hidden" class="inputUserId" name="userIdSession" value="-1">';
        }
	?>
    
    <div class="container">
        <div class="row">
            <p class="col-lg-6">Elige la cantidad de jugadores:</p>
            <input class="col-lg-6" type="number" name="txtPlayers" id="txtPlayers" max="3" min="1">
        </div>
        <div class="row">
            <p class="col-lg-6">Elige la cantidad de IA:</p>
            <input class="col-lg-6" type="number" name="txtIA" id="txtIA" max="3" min="1">
        </div>
        <input type="button" value="Aceptar" id="btnGamemode">
    </div>
    <script src="<?php echo $link; ?>js/pages/gamemode.js"></script>
</body>
</html>