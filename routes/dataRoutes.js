//DEPENDENCIES
const dataRouter    = require('express').Router()
const turf          = require('turf')

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
  console.log('hit')
  let gameData = {...req.body}
  let ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(',')[0];

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

//Update Player Name
dataRouter.put('/name/:id', (req, res) => {
  //The update name of either a host or player
  const playerType = req.body.host ? 'host' : 'player'
  Game.update(
    { _id: req.params.id },
    { $set: { [playerType + '.name'] : req.body.name } }
  ).then(data => {
    res.json(data)
  })
})

//Update Radius
dataRouter.put('/radius/:id', (req, res) => {
  Game.update(
    { _id: req.params.id },
    { $set: { 'radius' : req.body.radius } }
  ).then(data => {
    res.json(data)
  })
})

//Update Radius Meta Data
dataRouter.put('/radiusMetaData/:id', (req, res) => {
  Game.update(
    { _id: req.params.id },
    { $set: { 'radiusMetaData' : req.body.radiusMetaData } }
  ).then(data => {
    res.json(data)
  })
})

//Check if current radius guess is within the set radius circle
dataRouter.get('/checkRadiusMetaData/:id/:lat/:long', (req, res) => {
  Game.findOne({_id: req.params.id})
  .then((game)=> {
    const pt = turf.point([req.params.lat,req.params.long]);
    const poly = turf.polygon([game.radiusMetaData]);
    res.status(200).json(turf.inside(pt, poly))
  })
  .catch((err) => {
    console.log(err)
  })
})

//Update coordinates
dataRouter.put('/coordinates/:id', (req, res) => {
  Game.update(
    { _id: req.params.id },
    { $set: { 'coordinates' : req.body.coordinates } }
  ).then(data => {
    res.json(data)
  })
})

//Update active state
dataRouter.put('/active/:id', (req, res) => {
  Game.update(
    { _id: req.params.id },
    { $set: { 'active' : req.body.active } }
  ).then(data => {
    res.json(data)
  })
})

//Update active handler
dataRouter.put('/activeHandler/:id', (req, res) => {
  //The update active handler request is either a host or player
  const playerType = req.body.host ? 'host' : 'player'
  Game.update(
    { _id: req.params.id },
    { $set: { [playerType + '.active'] : req.body.active } }
  ).then(data => {
    res.json(data)
  })
})

//Update game completed
dataRouter.put('/completed/:id', (req, res) => {
  Game.update(
    { _id: req.params.id },
    { $set: { completed : req.body.completed } }
  ).then(data => {
    res.json(data)
  })
})

//Change total guesses left
dataRouter.put('/guesses/:id', (req, res) => {
  //Only update backend if host send the request (Otherwise it updates twice)
  if (req.body.host){
    Game.update(
      { _id: req.params.id },
      { $inc: { guesses : req.body.amount } }
    ).then(data => {
      res.json(data)
    })
  } else {
    res.status(200).send('Success 1')
  }
})


module.exports = dataRouter
