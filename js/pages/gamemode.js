$(document).ready(function(){

    $("#btnGamemode").click(function(){
        testInput();
    });

    function testInput(){
        var playerCount = $("#txtPlayers").val();
        var aiCount = $("#txtIA").val();
        var flag = false;
        var map = localStorage.getItem('map');
        localStorage.clear();
        for (let index = 1; index <= playerCount; index++) {
            var usrId = $(".inputUserId").attr('value');
            if(usrId != "-1" && flag){
                var personaje = {'idUser': usrId, 'skin': null, 'victories': 0 };
                flag = false;
            }else{
                var personaje = {'idUser': index, 'skin': null, 'victories': 0 };
            }
            
            localStorage.setItem('Player'+index, JSON.stringify(personaje));
        }

        for (let index = 1; index <= aiCount; index++) {
            var personajeIA = {'idIA': -index*10, 'skin': null, 'victories': 0 };
            localStorage.setItem('IA'+index, JSON.stringify(personajeIA));
        }
        
        localStorage.setItem('map', map);
        location.href = "http://localhost:8080/GW/GraficasWebPIA/pages/personaje.php";
    }
});