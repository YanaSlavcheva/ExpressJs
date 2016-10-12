let mongoose = require('mongoose')
mongoose.Promise = global.Promise

let Image = require('./image')

let tagSchema = new mongoose.Schema({
  name: {type: String},
  creationDate: {type: Date, default: Date.now},
  images: [Image.schema]
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
