const mongoose = require('mongoose')
const express = require('express')

mongoose.Promise = global.Promise

let app = express()
app.get('/', (req, res) => {
  console.log('Express ready!')
  mongoose
    .connect('mongodb://localhost:27017/pets-shop')
    .then(() => {
      console.log('MongoDB ready!')
      res.send('OK!')
    })
})
app.listen(1337)