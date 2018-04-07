//SCHEMAS
const mongoose      = require('../db/gameSchema.js')

//MODELS
const GameLog       = mongoose.model('GameLog')
const Game          = mongoose.model('Game')


module.exports = (socket, io) => {
  console.log('New client connected')

  socket.on('recieve client', data => {
    socket.playerName = data.player.name
  })

  socket.on('send chat', payload => {
    Game.update(
      { _id: payload.gameId },
      { $push: {
          gameLog : {
            playerName: payload.playerName,
            content: payload.content
          }
        }
      }
    ).then(data => {
      io.sockets.emit('send chat', payload)
    })
    .catch(err => {
      console.log(err)
    })
  })

  socket.on('player connect', playerName => {
    io.sockets.emit('player connect', playerName)
  })

  socket.on('update marker coordinates', coordinates => {
    io.sockets.emit('update marker coordinates', coordinates)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.sockets.emit('player disconnect', socket.playerName)
  })
}
