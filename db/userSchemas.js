const mongoose = require('./connection.js')
const Schema = mongoose.Schema

const title = ['Dr.', 'Professor', 'Lt.', 'Mr.', 'Mrs.', 'Ms.', 'Captain', 'Coach', 'Colonel', 'Sir', 'Officer', 'Pvt.', 'Chef', 'General', 'Darth', 'Lord', 'Ranger', 'Senator']
const name = ['Platypus', 'Koala', 'Beaver', 'Horse', 'Puppy', 'Kitten', 'Bear', 'Zebra', 'Hamster', 'Chipmunk', 'Squirrel', 'Gazzele', 'Crow', 'Fox']

const defaultNameGenerator = function(val){
  if (val === '' || !val){
    return title[Math.floor(Math.random() * title.length)] + ' ' + name[Math.floor(Math.random() * name.length)]
  }
}

const playerSchema = new Schema({
  'name': {
    type: String,
    set: defaultNameGenerator,
    required: true
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
    set: defaultNameGenerator,
    required: true
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
