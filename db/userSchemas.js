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
    required: false
  },
  'date': {
    type: Date,
    default: Date.now
  },
  'connected': {
    type: Boolean,
    required: false
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
    required: false
  },
  'date': {
    type: Date,
    default: Date.now
  },
  'connected': {
    type: Boolean,
    required: false
  }
})

module.exports = {
  playerSchema,
  hostSchema
}
