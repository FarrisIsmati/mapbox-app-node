//SCHEMAS
const mongoose      = require('../db/gameSchema.js')

//MODELS
const GameLog       = mongoose.model('GameLog')
const Game          = mongoose.model('Game')


module.exports = (socket, io) => {
  console.log('New client connected')

  socket.on('send chat', (payload) => {
    // Game.update(
    //   { _id: req.params.id },
    //   { $set: { [playerType + '.name'] : req.body.name } }
    // ).then(data => {
    //   res.json(data)
    // })
    console.log('Player Name: ' + payload.playerName + " | Content: " + payload.content + " | ID: " + payload.gameId)
    io.sockets.emit('send chat', payload)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}
