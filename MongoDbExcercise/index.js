let mongoose = require('mongoose')

mongoose.Promise = global.Promise
// TODO: define models here

let connection = 'mongodb://localhost:27017/imagestagsdb'

mongoose
.connect(connection)
.then(
  console.log('Connected to Mongoose')
)
