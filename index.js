const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

server.listen(3000)