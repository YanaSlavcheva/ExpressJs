let Tweet = require('mongoose').model('Tweet')

module.exports = {
  tweet: (req, res) => {
    res.render('tweets/create')
  },
  create: (req, res) => {
    let tweet = req.body

    if (tweet.message.length > 140) {
      tweet.globalError = 'Tweet is too long!'
      res.render('tweet', tweet)
    } else {
      Tweet
        .create(tweet)
        .then(tweet => {
          res.redirect('/')
        })
    }
  }
}