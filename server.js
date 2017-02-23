var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
var users = [],
    connections = [];

app.use(express.static('public'))

server.listen(process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/connections', (req, res) => {
    res.send({
        connections: connections.length
    })
})

io.sockets.on('connection', (socket) => {
    // create connection
    connections.push(socket)

    // disconnect
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
    })

    // send message
    socket.on('send message', (msgData) => {
        io.sockets.emit('new message', {msg: msgData})
    })
})