let Tag = require('./models/tag')

let mongoose = require('mongoose')
mongoose.Promise = global.Promise

let connection = 'mongodb://localhost:27017/imagestagsdb'

function saveImage(image) {
  // let allTags = []

  // for (var tag in image.Tags) {
  //   let currentTag = new Tag({
  //     name: tag,
  //     images: image
  //   })

  //   allTags.push(currentTag)
  // }

  mongoose
    .connect(connection)
    .then(() => {
      console.log('Connected to Mongoose')

      image
        .save()
        .then(console.log('Added image'))
        .catch(console.log)

      for (let i = 0; i < image.tags.length; i++) {
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
