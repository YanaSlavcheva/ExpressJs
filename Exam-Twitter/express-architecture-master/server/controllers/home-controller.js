let Tweet = require('mongoose').model('Tweet')

module.exports = {
  index: (req, res) => {
    Tweet.find({}, function(err, tweets){
      tweets.sort(function(a, b) {
        return new Date(a.createdOn) - new Date(b.createdOn)
      })
      tweetsToDisplay = tweets.slice(0, 100)

      res.render('home/index', {tweets: tweetsToDisplay})
    })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
