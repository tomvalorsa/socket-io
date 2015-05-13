var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Above, we can consider these things to be mounted on top of one another.
// app sets up express, http is a server on top of express, and io is another server mounted on top of http.


app.get('/', function(req, res){
  // Rather than send the whole html within a string, we can send an entire file using sendFile();
  // This takes the current directory name and then the path to the file.
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){

  console.log('a user connected');

  // During a connection, if this end received a 'chat message' event from the client-side
  // it will console.log the message.
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

