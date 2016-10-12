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
        .catch(console.log)
    })
}

module.exports.saveImage = saveImage
