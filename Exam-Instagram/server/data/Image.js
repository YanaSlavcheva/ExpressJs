const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'
let tooLongMessage = 'too long'

let imageSchema = mongoose.Schema({
    url: {type: String, requiredValidationMessage},
    description: {type: String, requiredValidationMessage},
    username: {type: String},
    createdOn: {type: Date, default: Date.now}
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
            Image.create(
            {
                username: 'Admin',
                url: 'https://s-media-cache-ak0.pinimg.com/736x/5b/11/c6/5b11c6b5eabb728c76b652c330ddaf8e.jpg',
                description: 'Super #cute black #kitten'
            },
            {
                username: 'Admin',
                url: 'http://cf.ltkcdn.net/cats/images/std/200777-425x322-kitten_crop.jpg',
                description: 'Super #CUTE orange #kitten'
            },
            {
                username: 'Admin',
                url: 'http://kittentoob.com/wp-content/uploads/sites/4/2012/01/blue-eyed-white-persian-kitten.jpg',
                description: 'Super beautiful #white #kitten'
            })
        }
    })
}
