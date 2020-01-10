/*
    Author: Vijeth P H
*/
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
users = [];
connections = [];
var port = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {


    connections.push(socket);
    console.log('Connected Users: %s', connections.length);



    socket.on('disconnect', function (data) {
        if (!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateusrnames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected Users: %s', connections.length);
    });

    socket.on('send message', function (data) {
        io.sockets.emit('new message', {
            msg: data,
            user: socket.username
        });
    });

    socket.on('new user', function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateusrnames();
    });

    function updateusrnames() {
        io.sockets.emit('get users', users);
    }
});
http.listen(port, function () {
    console.log('listening on *:' + port);
});