const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'
let tooLongMessage = 'too long'

let imageSchema = mongoose.Schema({
    views: Number,
    url: {type: String, requiredValidationMessage},
    description: {type: String, requiredValidationMessage},
    username: {type: String},
    createdOn: {type: Date, default: Date.now},
    likes: []
})

imageSchema.path('url').validate(function(value){
    return value.length < 500
}), 'Image url ' + tooLongMessage

imageSchema.path('description').validate(function(value){
    return value.length < 500
}), 'Image description ' + tooLongMessage

let Image = mongoose.model('Image', imageSchema)

module.exports.seedImages = () => {
    Image.find({}).then(images => {
        if (images.length === 0) {
            Image.create({
              username: 'Admin',
              views: 0,
              url: 'https://s-media-cache-ak0.pinimg.com/736x/5b/11/c6/5b11c6b5eabb728c76b652c330ddaf8e.jpg',
              description: 'Admin\'s image - Super #cute black #kitten @Pesho @normalnarabota',
              likes: []
            },
            {
              username: 'Admin',
              views: 0,
              url: 'http://cf.ltkcdn.net/cats/images/std/200777-425x322-kitten_crop.jpg',
              description: 'Admin\'s image - Super #CUTE orange #kitten @normal',
              likes: []
            },
            {
              username: 'Admin',
              views: 0,
              url: 'http://kittentoob.com/wp-content/uploads/sites/4/2012/01/blue-eyed-white-persian-kitten.jpg',
              description: 'Admin\'s image - #Super beautiful #white #kitten',
              likes: []
            },
            {
              username: 'normal',
              views: 0,
              url: 'https://s-media-cache-ak0.pinimg.com/564x/4a/2f/b9/4a2fb9accd24970c68e7ad72ab34971c.jpg',
              description: 'normal\'s image - Super beautiful #grey #kitten @Admin',
              likes: []
            },
            {
              username: 'pesho',
              views: 0,
              url: 'http://thezilla.com/wp-content/uploads/2015/07/fluffy_kittens_2-t2.jpg',
              description: 'pesho\'s image - #many kittens',
              likes: []
            })
        }
    })
}
