let Image = require('mongoose').model('Image')
let mongodb = require('mongodb');

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
  },
  delete: (req, res) => {
    let imageToDeleteId = req.body.id
    Image
      .remove(
        {_id: new mongodb.ObjectID(imageToDeleteId) }, 
        function (err, result){ 
          if (err) {
            console.log(err)
          }

          let deletedCount = result.result.n
          console.log('Deleted ' + deletedCount + ' images')
        })
      .then(image => {
        res.redirect('/')
      })
  },
  edit: (req, res) => {
    // get image by id
    // render form with loaded image data
    let imageId = req.params.imageId
    let image = Image.findOne({"_id": new mongodb.ObjectId(imageId)}, function(err, doc) {
       console.log(doc)

      res.render('images/edit', {image: doc})
    });
  },
  update: (req, res) => {
    console.log('In update method')
    // parse data
  }
}