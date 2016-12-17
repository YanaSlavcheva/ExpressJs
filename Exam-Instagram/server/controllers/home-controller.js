let Image = require('mongoose').model('Image')

module.exports = {
  index: (req, res) => {
    Image.find({}, function(err, images){
      images.sort(function(a, b) {
        return new Date(a.createdOn) - new Date(b.createdOn)
      })
      imagesToDisplay = images.slice(0, 100)

      res.render('home/index', {images: imagesToDisplay})
    })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
