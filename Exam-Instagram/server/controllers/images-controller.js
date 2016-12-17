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
    console.log('In update method')

    // parse data
    let imageInfoForUpdate = req.body
    Image.findOne({"_id": new mongodb.ObjectId(imageInfoForUpdate.id)}, function(err, image) {
      if (err) {
        console.log(err);
        res.redirect('/')
      } else if (image) {
        console.log('Image to be updated: ', image);

        // Updating the properties
        image.url = imageInfoForUpdate.url
        image.description = imageInfoForUpdate.description

        // Lets save it
        image.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Updated image: ', image);
            res.redirect('/')
          }
        });
      } else {
        console.log('User not found!');
      }
    });
  }
}