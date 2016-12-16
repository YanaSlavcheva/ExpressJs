let Tweet = require('mongoose').model('Tweet')

module.exports = {
  index: (req, res) => {
    Tweet.find({}, function(err, tweets) {
        res.render('tweets/index', {tweets: tweets})
    })
  }
}