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
        {_id: new mongodb.ObjectID(imageToDeleteId)}, 
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
    // TODO: add validation if no object is sent here
    let imageId = req.body.id
    Image.findOne({"_id": new mongodb.ObjectId(imageId)}, function(err, image) {
      console.log('Image to delete: ' + image)
      res.render('images/edit', {image: image})
    });
  },
  update: (req, res) => {
    let imageInfoForUpdate = req.body
    Image.findOne({"_id": new mongodb.ObjectId(imageInfoForUpdate.id)}, function(err, image) {
      if (err) {
        console.log(err)
      } else if (image) {
        image.url = imageInfoForUpdate.url
        image.description = imageInfoForUpdate.description

        image.save(function (err) {
          if (err) {
            console.log(err)
          } else {            
            console.log('Image with description "' + image.description + '" updated successfully')
            res.redirect('/')
          }
        });
      } else {
        console.log('Image not found!')
        res.redirect('/')
      }
    });
  }
}