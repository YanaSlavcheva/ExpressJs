let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let Image = mongoose.model('Image', {
  url: {type: String},
  creationDate: {type: Date, default: Date.now},
  description: {type: String}
})

module.exports = Image
