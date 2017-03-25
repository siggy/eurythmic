var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var compression = require('compression');

app.use(compression());

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.static(path.join(__dirname, 'public')));

var clients = [];

var voltron = io.of('/voltron');
voltron.on('connection', function(socket){
  console.log('voltron connected');
});
voltron.emit('ondevicemotion', 'SUP');

io.on('connection', function(socket){
  clients.push(socket);

  console.log('a user connected ' + socket.id);
  // console.log('THIS');
  // console.log(this);

  socket.on('ondevicemotion', function(motion) {
    console.log(this.id);

    voltron.emit('ondevicemotion', motion);
    // console.log(motion);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
