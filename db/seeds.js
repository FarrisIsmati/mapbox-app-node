const mongoose    = require('./gameSchema')

const Game        = mongoose.model('Game')

Game.remove({})
  .then(() => {
    process.exit()
  })
  .catch((err) => {
    console.log(err)
  })
