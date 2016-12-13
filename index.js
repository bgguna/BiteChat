var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('util');

// Server constants
const HOST = '141.85.159.151';
const PORT = 3000;

app.get('/', function(req, res) {
  res.sendfile('index.html');
});//.use(express.static('public'));

io.on('connection', function(socket) {
  var user_ip = socket.handshake.address;
  var user_id = getUserId(user_ip);
  console_message = util.format('User %s with ip %s connected to the chat', user_id, user_ip)
  console.log(console_message);
  socket.on('disconnect', function() {
      console.log('User %s disconnected.', user_id);
  });

  socket.on('chat message', function(message) {
      if (message.trim() != '') {
        message = user_id + ': ' + message;
        io.emit('chat message', message);
        console.log('message from ' + message);
      }
  });
});

http.listen(PORT, HOST, function() {
  console.log('listening on ' + HOST + ':' + PORT);
});

function getUserId(user_ip) {
    var user_id = user_ip;
    if (user_ip.toString().trim() == '141.85.159.151') {
        user_id = 'bitedan';
    } else if (user_ip == '141.85.159.114') {
        user_id = 'stevena';
    } else if (user_ip === '141.85.159.246') {
        user_id = 'little d-hilip';
    } else if (user_ip === '141.85.159.48') {
        user_id = 'bunny';
    } else if (user_ip === '141.85.159.124') {
        user_id = 'gregAnd';
    } else {
        user_id = 'stranger';
    }
    return user_id; 
}