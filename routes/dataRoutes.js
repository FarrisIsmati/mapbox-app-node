//DEPENDENCIES
const dataRouter    = require('express').Router()

//SCHEMAS
const mongoose      = require('../db/gameSchema.js')

//MODELS
const Player        = mongoose.model('Player')
const Host          = mongoose.model('Host')
const GameLog       = mongoose.model('GameLog')
const Game          = mongoose.model('Game')

//Get Game Info
dataRouter.get('/:id', (req,res)=> {
  Game.findOne({_id: req.params.id})
  .then((game)=> {
    res.status(200).json(game)
  })
  .catch((err) => {
    console.log(err)
  })
})

//Create Game
dataRouter.post('/', (req, res) => {
  let gameData = {...req.body}
  let ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];

  //Check future to make sure ip works
  if (req.body.host) {
    gameData.host.ip = ip
  } else {
    gameData.player.ip = ip
  }

  let newGame = new Game(gameData)
  newGame.save()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err)=>{
      res.json({ "error": err })
    })
})

module.exports = dataRouter
