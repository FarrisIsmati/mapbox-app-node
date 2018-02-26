const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const playerSchema = new Schema({
  'name': {
    type: String,
    required: false
  },
  'guess': {
    type: String,
    required: false
  },
  'ip': {
    type: String,
    required: true
  },
  'active': {
    type: Boolean,
    required: true
  },
  'date': {
    type: Date,
    default: Date.now
  }
})

const hostSchema = new mongoose.Schema({
  'name': {
    type: String,
    required: false
  },
  'ip': {
    type: String,
    required: true
  },
  'active': {
    type: Boolean,
    required: true
  },
  'date': {
    type: Date,
    default: Date.now
  }
})

module.exports = {
  playerSchema,
  hostSchema
}
