const fs = require('fs')
const http = require('http')
const path = require('path')
const express = require('express')
const socketIo = require('socket.io')
const shuffle = require('shuffle-array')

const FILE_NAME = 'icd10cm_codes_2019.txt'

const file = fs.readFileSync(path.join(__dirname, FILE_NAME), {
    encoding: 'utf-8'
})

const pairs = file.split('\r\n').reduce((accum, line) => {
    const index = line.indexOf(' ')

    const code = line.slice(0, index)
    const description = line.slice(index, line.length).trimLeft()

    const pair = [code, description]
    if (pair[1].match(/subsequent encounter|sequela/)) {
        return accum
    }
    return accum.concat([pair])
}, [])

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.static(path.join(__dirname, 'static')))

io.on('connection', socket => {
    socket.on('newGame', () => {
        // Emit new game
        const [code, description] = pairs[Math.floor(Math.random() * pairs.length)]

        const wrongDescriptions = []
        while (wrongDescriptions.length !== 3) {
            const [c, d] = pairs[Math.floor(Math.random() * pairs.length)]
            if (code === c) {
                continue
            }
            wrongDescriptions.push(d)
        }

        const options = shuffle([...wrongDescriptions, description])

        const game = { code, options, answer: options.indexOf(description) }

        socket.emit('game', game)
    })
})

server.listen(3000)