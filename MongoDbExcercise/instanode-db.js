let Tag = require('./models/tag')

let mongoose = require('mongoose')
mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/imagestagsdb'

function saveImage (image) {
  mongoose
    .connect(connection)
    .then(() => {
      console.log('Connected to Mongoose')

      image
        .save()
        .then(console.log('Added image'))
        .catch(console.log)

      for (let i = 0; i < image.tags.length; i++) {
        // TODO: check if such tag exists... maybe...

        new Tag({
          name: image.tags[i],
          images: image
        })
          .save()
          .then(console.log('Added tag ' + image.tags[i]))
      }
    })
}

module.exports.saveImage = saveImage
