let mongoose = require('mongoose')
mongoose.Promise = global.Promise

let Image = require('./image')

let Tag = mongoose.model('Tag', {
  name: {type: String},
  creationDate: {type: Date, default: Date.now},
  images: [Image.schema]
})

module.exports = Tag
