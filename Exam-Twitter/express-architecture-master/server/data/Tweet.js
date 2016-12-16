const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let tweetSchema = mongoose.Schema({
    message: {type: String, requiredValidationMessage},
    createdOn: {type: Date, default: Date.now}
})

tweetSchema.path('message').validate(function(value){
    return value.length < 140
}), 'Tweet too long'

let Tweet = mongoose.model('Tweet', tweetSchema)

module.exports.seedTweets = () => {
    Tweet.find({}).then(tweets => {
        if (tweets.length === 0) {
            Tweet.create({
                message: 'Tweet me baby one more time'
            })
        }
    })
}

module.exports.All = Tweet