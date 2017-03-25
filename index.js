var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

var clients = [];

var voltron = io.of('/voltron');
voltron.on('connection', function(socket){
  console.log('voltron connected');
});

io.on('connection', function(socket){
  clients.push(socket);

  console.log('a user connected: ' + socket.id);

  socket.on('ondevicemotion', function(motion) {
    console.log(this.id + ": " + JSON.stringify(motion));

    motion.socket = socket.id;
    voltron.emit('ondevicemotion', motion);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
