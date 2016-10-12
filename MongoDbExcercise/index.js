let Image = require('./models/image')

let instanodeDb = require('./instanode-db')

let newImage = new Image({
  url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  description: 'such cat much wow',
  tags: ['cat', 'kitty', 'cute', 'catstagram']
})

instanodeDb.saveImage(newImage)
