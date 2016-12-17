let Image = require('mongoose').model('Image')

module.exports = {
  index: (req, res) => {
    let wantedTag = req.params.tagName
    let imagesWhoseDescriptionContainTag = [];
    Image.find({}, function(err, images){
      images.forEach(function(image){
          // lovely, I know, I know...
          let words = image.message
            .toLowerCase()
            .replace("."," ")
            .replace(","," ")
            .replace("!"," ")
            .replace("?"," ")
            .split(" ");

          let result = words.filter(function(tag){
              return tag === '#' + wantedTag
          })

          if (result.length > 0) {
              imagesWhoseDescriptionContainTag.push(image)
          }
      })

      imagesToDisplay = imagesWhoseDescriptionContainTag.slice(0, 100)

      res.render('home/index', {images: imagesToDisplay, tagName: wantedTag})
    })
  }
}