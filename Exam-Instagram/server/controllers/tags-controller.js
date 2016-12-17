let Image = require('mongoose').model('Image')

module.exports = {
  index: (req, res) => {
    let wantedTag = req.params.tagName
    let imagesWhoseDescriptionContainsTag = [];
    Image.find({}, function(err, images){
      images.forEach(function(image){
          // lovely, I know, I know...
          let words = image.description
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
              imagesWhoseDescriptionContainsTag.push(image)
          }
      })

      imagesToDisplay = imagesWhoseDescriptionContainsTag.slice(0, 100)

      res.render('home/index', {images: imagesToDisplay, tagName: wantedTag})
    })
  }
}