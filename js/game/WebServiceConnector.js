export default class WebServiceConnector {
    static onWin(winnerId) {
        // Aquí puedes hacer lo necesario para registrar la victoria
        // winnerId es el id del ganador, si no gana un usuario con id, es nulo
        if (winnerId) {
            console.log(winnerId); // Ejemplo
        }
    }
}