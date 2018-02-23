//DEPENDENCIES
const dataRouter    = require('express').Router()

//SCHEMAS
const mongoose      = require('../db/gameSchema.js')

//MODELS
const Player        = mongoose.model('Player')
const Host          = mongoose.model('Host')
const GameLog       = mongoose.model('GameLog')
const Game          = mongoose.model('Game')

//Create Game
dataRouter.post('/', (req, res) => {
  let newGame = new Game(req.body)
  newGame.save()
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err)=>{
      res.json({ "error": err })
    })
})

module.exports = dataRouter
