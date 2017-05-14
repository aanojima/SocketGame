'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1337;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use public folder for static files
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    console.log(req.query);
    //res.render('pages/index');
    res.render('pages/game');
});

app.get('/controller', function (req, res) {
    res.render('pages/controller');
});

// STATES
const UNKNOWN = 0;
const KNOW_TYPE = 1;

const UNKNOWN_SOCKET = -1;
const GAME_SOCKET = 0;
const CONTROL_SOCKET = 1;

var gameSocket;
var connections = [];
function onConnection(socket) {
    var state = UNKNOWN;
    var type = UNKNOWN_SOCKET;
    var clientId = -1;
    socket.emit('get-socket-type');

    socket.on('socket-type', function (data) {
        if (state != UNKNOWN) return;
        if (data["type"] == "GAME") {
            type = GAME_SOCKET;
            gameSocket = socket;
        }
        else if (data["type"] == "CONTROLLER") {
            type = CONTROL_SOCKET;
            clientId = connections.length;
            connections.push(socket);
        }
        state = KNOW_TYPE;
    })

    socket.on('controller-event', function (data) {
        if (state != KNOW_TYPE || type != CONTROL_SOCKET || gameSocket === undefined) {
            return;
        }
        data['client-ID'] = clientId;
        gameSocket.emit('controller-event', data);
    });
}
io.on('connection', onConnection);

http.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
