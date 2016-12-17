let Image = require('mongoose').model('Image')

module.exports = {
  add: (req, res) => {
    res.render('images/create')
  },
  create: (req, res) => {
    let image = req.body

    if (image.url.length > 500) {
      image.globalError = 'Images\'s url is too long!'
      res.render('image', image)
    } else if (image.description.length > 500) {
      image.globalError = 'Images\'s description is too long!'
      res.render('image', image)
    } else {
      image.username = req.user._doc.username
      Image
        .create(image)
        .then(image => {
          res.redirect('/')
        })
    }
  }
}