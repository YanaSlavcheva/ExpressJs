let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let image = require('./image')

let Tag = mongoose.model('Tag', {
  name: {type: String},
  creationDate: {type: Date, default: Date.now},
  images: [image.schema]
})

module.exports = Tag
