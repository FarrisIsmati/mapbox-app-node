//DEPENDENCIES
const express         = require('express')
const parser          = require('body-parser')
const cors            = require('cors')
const socketIO        = require('socket.io')
const http            = require('http')
const app             = express()
const server          = require('http').createServer(app)
const io              = socketIO(server)

//SCHEMAS
const mongoose        = require('./db/gameSchema.js')

//ROUTES
const dataRoutes      = require('./routes/dataRoutes')

//APP
app.set('port', process.env.PORT || 3001)
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())

app.use('/game', dataRoutes)

io.on('connection', socket => {
  console.log('New client connected')

  socket.on('send chat', (payload) => {
    console.log('Player Name: ' + payload.playerName + " | Content: " + payload.content)
    io.sockets.emit('send chat', payload)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(app.get('port'), () => {
  console.log('You are flying on ' + app.get('port'))
})
