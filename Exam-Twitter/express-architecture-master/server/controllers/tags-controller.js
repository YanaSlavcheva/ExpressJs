let Tweet = require('mongoose').model('Tweet')

module.exports = {
  index: (req, res) => {
    let wantedTag = req.params.tagName
    let tweetsThatContainTag = [];
    Tweet.find({}, function(err, tweets){
      tweets.forEach(function(tweet){
          // lovely, I know, I know...
          let words = tweet.message
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
              tweetsThatContainTag.push(tweet)
          }
      })

      tweetsToDisplay = tweetsThatContainTag.slice(0, 100)

      res.render('home/index', {tweets: tweetsToDisplay})
    })
  },
  about: (req, res) => {
    res.render('home/about')
  }
}