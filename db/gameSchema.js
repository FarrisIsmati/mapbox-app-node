const mongoose        = require('./connection.js')
const playerSchema    = require('./userSchemas').playerSchema
const hostSchema      = require('./userSchemas').hostSchema

const schema = mongoose.Schema

const gameLogSchema = new mongoose.Schema({
  'playerId': {
    type: String,
    required: true
  },
  'playerName': {
    type: String,
    required: true
  },
  'content': {
    type: String,
    required: true
  }
})

const gameSchema = new mongoose.Schema({
  'title': {
    type: String,
    uppercase: true,
    required: true
  },
  'host': {
    type: hostSchema,
    required: false
  },
  'player': {
    type: playerSchema,
    required: false
  },
  'guesses': {
    type: Number,
    required: false
  },
  'gameLog': {
    type: [gameLogSchema],
    index: true,
    required: false
  },
  'completed': {
    type: Boolean,
    required: true
  },
  'active': {
    type: Boolean,
    required: true
  },
  'coordinates': {
    type: String,
    required: false
  },
  'radius': {
    type: String,
    required: false
  },
  'date': {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Player', playerSchema)
mongoose.model('Host', hostSchema)
mongoose.model('GameLog', gameLogSchema)
mongoose.model('Game', gameSchema)

module.exports = mongoose
