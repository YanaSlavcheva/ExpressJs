let Image = require('mongoose').model('Image')

module.exports = {
  index: (req, res) => {
    Image.find({}, function(err, images) {
      images.sort(function(a, b) {
        return new Date(b.createdOn) - new Date(a.createdOn)
      })
    
      images.forEach(function(image) {
        image.views += 1

        image.save(function (err) {
          if (err) {
            console.log(err)
          }
        })
      })
    
      imagesToDisplay = images.slice(0, 100)
      res.render('home/index', { images: imagesToDisplay })
    })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
