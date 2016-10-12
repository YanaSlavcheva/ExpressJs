let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let Image = mongoose.model('Image', {
  url: {type: String},
  creationDate: {type: Date, default: Date.now},
  description: {type: String},
  tags: [Tag.schema]
})

let Tag = mongoose.model('Tag', {
  name: {type: String},
  creationDate: {type: Date, default: Date.now},
  images: [Image.schema]
})

let connection = 'mongodb://localhost:27017/imagestagsdb'

mongoose
.connect(connection)
.then(
  console.log('Connected to Mongoose')


)
