var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
// This is the server for the client-side page. It will serve up index.html.
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
// This server will give/receive info to/from our app.
// This is the source of info that we're sending to our site.
// This is the connection between the site and the info that allows data to be sent both ways.
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    // io is the server that is listening to the app server to see if anything is happening.
    // Here io will 'emit' the time when this function is called.
    io.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
// When the io server 'hears' someone connect it will run this function.
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);
});

app.listen(3000);