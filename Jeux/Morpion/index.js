var app = require('express')();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var waitingbro = false;
var set = false;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log(waitingbro);
        if (!waitingbro && set == false) {
            if (msg == "waiting bro") {
                io.emit('message',"you are player 1");
                waitingbro = true ;
            }
        }else{
            waitingbro = false;
            set = false;
        }
        if (msg == "Winner is 1") {
            console.log(msg);
            io.emit('message',"reset");
        }
    });
    if (waitingbro) {
        io.emit('message',"bro found")
        waitingbro = false;
        set = true;
    }
    socket.on('cadre', (msg) => {
        console.log(msg)
        io.emit('message',"switch player");
        io.emit('cadre',msg)
    });
  });

http.listen(80, () => {
  console.log('listening on :80');
});