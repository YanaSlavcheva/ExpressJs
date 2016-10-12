// let Tag = require('./models/tag')
let Image = require('./models/image')

let instanodeDb = require('./instanode-db')

let newImage = new Image({
  url: 'google.com',
  description: 'google-cat'
})

instanodeDb.saveImage(newImage)
