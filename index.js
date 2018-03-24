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

//SOCKET
const socket          = require('./socket/socket')

//APP
app.set('port', process.env.PORT || 3001)
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())

app.use('/game', dataRoutes)
io.on('connection', data => socket(data, io))

server.listen(app.get('port'), () => {
  console.log('You are flying on ' + app.get('port'))
})
