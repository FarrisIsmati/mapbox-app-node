const mongoose = require('mongoose')

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MLAB_URL, { autoIndex: false })
} else {
  mongoose.connect("mongodb://localhost/mapboxGame", { autoIndex: false });
}

module.exports = mongoose
