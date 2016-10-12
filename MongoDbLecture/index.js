let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let Cat = mongoose.model('Cat', {
  name: String,
  age: Number
})

let connection = 'mongodb://localhost:27017/mongoosedb'

mongoose
.connect(connection)
.then(() => {
  console.log('MongoDB up and running!')

  new Cat({
    name: 'Pesho',
    age: 12
  })
  .save()
  .catch(console.log)
})
