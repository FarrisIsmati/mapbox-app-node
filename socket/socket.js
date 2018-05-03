//SCHEMAS
const mongoose      = require('../db/gameSchema.js')

//MODELS
const GameLog       = mongoose.model('GameLog')
const Game          = mongoose.model('Game')


module.exports = (socket, io) => {
  console.log('New client connected')
  socket.recievedClient = false

  socket.on('recieve client', data => {
    socket.recievedClient = true
    socket.gameId = data.game.id
    socket.playerName = data.player.name
    socket.playerHost = data.player.host
    socket.playerHost ?
      Game.update(
        { _id: socket.gameId },
        { $set: { "host.connected": true } }
      ).then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    : Game.update(
        { _id: socket.gameId },
        { $set: { "player.connected": true} }
      ).then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
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

  socket.on('send message', payload => {
    Game.update(
      { _id: payload.gameId },
      { $push: {
          gameLog : {
            content: payload.content
          }
        }
      }
    ).then(data => {
      io.sockets.emit('send message', payload)
    })
    .catch(err => {
      console.log(err)
    })
  })

  socket.on('reduce guess', payload => {
    Game.update(
      { _id: payload.gameId },
      { $inc: { guesses : -1 } }
    ).then(data => {
      io.sockets.emit('reduce guess', payload)
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
    //If you recieved the client which means the game wasn't full
    //Prevents disconnect message from a third party trying to join
    if (socket.recievedClient) {
      socket.playerHost ?
        Game.update(
          { _id: socket.gameId },
          { $set: { 'host.connected': false, 'active': false } }
        ).then(data => {
          io.sockets.emit('player disconnect', socket.playerName)
        })
        .catch(err => {
          console.log(err)
        })
      : Game.update(
          { _id: socket.gameId },
          { $set: { 'player.connected': false, 'active': false } }
        ).then(data => {
          io.sockets.emit('player disconnect', socket.playerName)
        })
        .catch(err => [
          console.log(err)
        ])
    }
  })
}
