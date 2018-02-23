//DEPENDENCIES
const express         = require('express')
const parser          = require('body-parser')
const cors            = require('cors')
const app             = express()

//SCHEMAS
const mongoose        = require('./db/gameSchema.js')

//ROUTES
const dataRoutes      = require('./routes/dataRoutes')

//APP
app.set('port', process.env.PORT || 3001)
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cors())

app.use('/game', dataRoutes)

app.listen(app.get('port'), () => {
  console.log('You are flying on ' + app.get('port'))
})
