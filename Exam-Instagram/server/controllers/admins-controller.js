let User = require('mongoose').model('User')
let mongodb = require('mongodb');

module.exports = {
  all: (req, res) => {
    User.find({}, function(err, users) {
      let admins = users.filter(function(user) {
        return user._doc.roles.indexOf('Admin') > -1
      })
      
      res.render('admins/all', {admins: admins})
    })
  }, add: (req, res) => {
    User.find({}, function(err, users) {
      let usersNotAdmins = users.filter(function(user) {
        return user._doc.roles.indexOf('Admin') === -1
      })
      
      res.render('admins/add', { users: usersNotAdmins })
    })
  }, update: (req, res) => {
    let userToMakeAdminId = req.body.id
    User.findOne({ "_id": new mongodb.ObjectId(userToMakeAdminId) }, function(err, user) {
      if (err) {
        console.log(err)
      } else if (user) {
        user.roles.push('Admin')

        user.save(function (err) {
          if (err) {
            console.log(err)
          } else {            
            console.log('User "' + user.username + '" made admin successfully')
            res.redirect('/admins/all')
          }
        })
      } else {
        console.log('User not found!')
        res.redirect('/')
      }
    })
  }
}
