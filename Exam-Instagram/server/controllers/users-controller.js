let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')
let Image = require('mongoose').model('Image')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let user = req.body
    User.findOne({ username: user.username.toLowerCase() }, function(err, userInDB) {
      if (err) {
        console.log(err)
      } else if (userInDB) {
        user.globalError = 'Username taken!'
        res.render('users/register', user)
      } else {
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
      }
    })
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let inputUser = req.body

    User
      .findOne({ username: inputUser.username.toLowerCase() })
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
    Image.find({}, function(err, images) {
      let usersImages = images.filter(function(image) {
        return image._doc.username === username
      })

      let imagesThatContainUserHandle = []
      images.forEach(function(image){
          // lovely, I know, I know...
          let words = image.description
            .toLowerCase()
            .replace("."," ")
            .replace(","," ")
            .replace("!"," ")
            .replace("?"," ")
            .split(" ");

          let result = words.filter(function(tag){
              return tag === '@' + username.toLowerCase()
          })

          if (result.length > 0) {
              imagesThatContainUserHandle.push(image)
          }
      })

      imagesToDisplay = usersImages.concat(imagesThatContainUserHandle).slice(0, 100)
      imagesToDisplay.forEach(function(image) {
        image.views += 1

        image.save(function (err) {
          if (err) {
            console.log(err)
          }
        })
      })

      res.render('users/profile', { images: imagesToDisplay, username: username })
    })
  }
}
