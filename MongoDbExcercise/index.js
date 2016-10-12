let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let Image = mongoose.model('Image', {
  url: {type: String},
  creationDate: {type: Date, default: Date.now},
  description: {type: String}
})

let Tag = mongoose.model('Tag', {
  name: {type: String},
  creationDate: {type: Date, default: Date.now},
  images: [Image.schema]
})

let connection = 'mongodb://localhost:27017/imagestagsdb'

mongoose
.connect(connection)
.then(() => {
  console.log('Connected to Mongoose')

  new Tag({
    name: 'happy',
    images: [
      new Image({
        url: 'http://cdn.pet360.com/pet360/Content/Images/CMS/Articles/Happy_Cat_Smiling.jpg',
        description: 'small fluffy kitten'
      })
    ]
  })
  .save()
  .catch(console.log)

  Tag
    .find({})
    .exec()
    .then(tags => console.log(tags))
})
