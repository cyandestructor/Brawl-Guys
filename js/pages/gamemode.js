$(document).ready(function(){

    $("#btnGamemode").click(function(){
        testInput();
    });

    $("#txtIADif").on('change', function(){
        var dificultad = $(this).find('option:selected').text();
        console.log(dificultad);
        if(dificultad == 'Fácil'){
            localStorage.setItem('difficulty', 'easy');
        }else if(dificultad == 'Media'){
            localStorage.setItem('difficulty', 'normal');
        }else if(dificultad == 'Difícil'){
            localStorage.setItem('difficulty', 'hard');
        }
    });

    $("#txtItems").on('change', function(){
        var items = $(this).find('option:selected').text();
        if(items = "Con Items"){
            localStorage.setItem('items', 'true');
        }else if (items = "Sin Items"){
            localStorage.setItem('items', 'false');
        }
    });

    function testInput(){   
        var playerCount = $("#txtPlayers").val();
        var aiCount = $("#txtIA").val();
        var flag = true;
        var map = localStorage.getItem('map');
        var session = localStorage.getItem('isLoged');
        var sessionId = localStorage.getItem('sessionId');  
        var difficulty = localStorage.getItem('difficulty');
        var itemsFlag = localStorage.getItem('items');

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
        localStorage.setItem('isLoged', session);
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('difficulty', difficulty);
        localStorage.setItem('items', itemsFlag);
        location.href = "/pages/personaje.html";
    }
});