const mongoose = require('mongoose')

let requiredValidationMessage = '{PATH} is required'

let tweetSchema = mongoose.Schema({
    message: {type: String, requiredValidationMessage},
    username: {type: String},
    createdOn: {type: Date, default: Date.now}
})

tweetSchema.path('message').validate(function(value){
    return value.length < 140
}), 'Tweet too long'

let Tweet = mongoose.model('Tweet', tweetSchema)

module.exports.seedTweets = () => {
    Tweet.find({}).then(tweets => {
        if (tweets.length === 0) {
            Tweet.create(
            {
                username: 'Admin',
                message: 'Tweet me baby one more time 1'
            },
            {
                username: 'Admin',
                message: 'Tweet me baby one more time 2'
            },
            {
                username: 'Admin',
                message: 'Tweet me baby one more time 3'
            }
            )
        }
    })
}

module.exports.All = Tweet