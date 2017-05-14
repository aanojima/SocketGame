$(document).ready(function(){

    var socket = io();
    socket.on("get-socket-type", function (data) {
        console.log("here", data);
        socket.emit("socket-type", { 'type': 'CONTROLLER' });
    });

	function pressA() {
		// TODO
        var btnEvent = EventButton('A', BUTTON_DOWN);
        socket.emit('controller-event', { 'event-type': 'button', 'event': btnEvent });
	}

	function pressB() {
		// TODO
        var btnEvent = EventButton('B', BUTTON_DOWN);
        socket.emit('controller-event', { 'event-type': 'button', 'event': btnEvent });
	}

	function pressUp() {
		// TODO
        var btnEvent = EventButton('UP', BUTTON_DOWN);
        socket.emit('controller-event', { 'event-type': 'button', 'event': btnEvent });
	}

	function pressDown() {
		// TODO
        var btnEvent = EventButton('DOWN', BUTTON_DOWN);
        socket.emit('controller-event', { 'event-type': 'button', 'event': btnEvent });
	}

	function pressLeft() {
		// TODO
        var btnEvent = EventButton('LEFT', BUTTON_DOWN);
        socket.emit('controller-event', { 'event-type': 'button', 'event': btnEvent });
	}

	function pressRight() {
		// TODO
        var btnEvent = EventButton('RIGHT', BUTTON_DOWN);
        socket.emit('controller-event', { 'event-type': 'button', 'event': btnEvent });
	}

	function handleA(event) {
		var width = $("#a-button img").width();
		var height = $("#a-button img").height();
		var x = event.offsetX - (width / 2);
		var y = -1 * ((event.offsetY) - (height / 2));
		var r = 0.4 * Math.min(width, height);
		if (x*x + y*y < r*r) {
			pressA();
		}
	}

	function handleB(event) {
		var width = $("#b-button img").width();
		var height = $("#b-button img").height();
		var x = event.offsetX - (width / 2);
		var y = -1 * ((event.offsetY) - (height / 2));
		var r = 0.4 * Math.min(width, height);
		if (x*x + y*y < r*r) {
			pressB();
		}
	}

	function handleDPad(event) {
		var width = $("#d-pad img").width();
		var height = $("#d-pad img").height();
		var x = event.offsetX - (width / 2);
		var y = -1 * ((event.offsetY) - (height / 2));
		var componentWidth = 0.33 * width;
		var componentHeight = 0.33 * height;
		var realWidth = 0.80 * width;
		var realHeight = 0.80 * height;
		if (x > 0.5 * realWidth || x < -0.5 * realWidth ||
			y > 0.5 * realHeight || y < -0.5 * realHeight) {
			return;
		}

		if (y > x) {
			if (y > -1 * x) {
				if (x < 0.5 * componentWidth && x > -0.5 * componentWidth) {
					pressUp();
				}
			}
			else {
				if (y < 0.5 * componentWidth && y > -0.5 * componentWidth) {
					pressLeft();
				}
			}
		}
		else {
			if (y > -1 * x) {
				if (y < 0.5 * componentWidth && y > -0.5 * componentWidth) {
					pressRight();
				}
			}
			else {
				if (x < 0.5 * componentWidth && x > -0.5 * componentWidth) {
					pressDown();
				}
				
			}
		}
	}

	$("#a-button img").on("click", handleA);

	$("#b-button img").on("click", handleB);

	$("#d-pad img").on("click", handleDPad);
});