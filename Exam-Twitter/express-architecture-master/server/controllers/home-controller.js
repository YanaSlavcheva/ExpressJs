let Tweet = require('mongoose').model('Tweet')

module.exports = {
  index: (req, res) => {
    Tweet.find({}, function(err, tweets){
      res.render('home/index', {tweets: tweets})
    })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
