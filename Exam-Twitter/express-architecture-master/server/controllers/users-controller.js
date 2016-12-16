let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')
let Tweet = require('mongoose').model('Tweet')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let user = req.body

    if (user.password !== user.confirmPassword) {
      user.globalError = 'Passwords do not match!'
      res.render('users/register', user)
    } else {
      user.salt = encryption.generateSalt()
      user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

      User
        .create(user)
        .then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/register', { globalError: 'Ooops 500' })
              return
            }

            res.redirect('/')
          })
        })
    }
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let inputUser = req.body

    User
      .findOne({ username: inputUser.username })
      .then(user => {
        if (!user.authenticate(inputUser.password)) {
          res.render('users/login', { globalError: 'Invalid username or password' })
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              res.render('users/login', { globalError: 'Ooops 500' })
              return
            }

            res.redirect('/')
          })
        }
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  },
  profile: (req, res) => {
    let username = req.params.username
    Tweet.find({}, function(err, tweets){
      let result = tweets.filter(function(tweet) {
        return tweet._doc.username === username
      })
      tweetsToDisplay = result.slice(0, 100)

      res.render('users/profile', {tweets: tweetsToDisplay, username: username})
    })
  }
}
