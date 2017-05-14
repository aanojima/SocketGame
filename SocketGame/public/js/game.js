$(document).ready(function () {

    var socket = io();
    socket.on("get-socket-type", function (data) {
        socket.emit("socket-type", { 'type': 'GAME' });
    });

    socket.on('controller-event', function (data) {
        var eventType = data['event-type'];
        var clientId = data['client-ID'];
        if (eventType == 'button') {
            var buttonEvent = data['event'];
            var buttonId = buttonEvent.buttonId;
            console.log(clientId, buttonId);
            switch (buttonId) {
                case 'A':
                    pressA();
                    break;
                case 'B':
                    pressB();
                    break;
                case 'UP':
                    pressUp();
                    break;
                case 'DOWN':
                    pressDown();
                    break;
                case 'LEFT':
                    pressLeft();
                    break;
                case 'RIGHT':
                    pressRight();
                    break;
                default:
                    break;
            }
        }
    });

    function pressA() {
        // TODO
    }

    function pressB() {
        // TODO
    }

    function pressUp() {
        // TODO
    }

    function pressDown() {
        // TODO
    }

    function pressLeft() {
        // TODO
    }

    function pressRight() {
        // TODO
    }
});