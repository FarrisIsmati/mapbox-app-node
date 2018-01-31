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
    required: true
  },
  'user': {
    type: playerSchema,
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
  'location': {
    type: String,
    required: true
  },
  'radius': {
    type: String,
    required: true
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
