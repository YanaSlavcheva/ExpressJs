let mongoose = require('mongoose')
mongoose.Promise = global.Promise

var imageSchema = new mongoose.Schema({
  url: {type: String},
  creationDate: {type: Date, default: Date.now},
  description: {type: String}
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image
