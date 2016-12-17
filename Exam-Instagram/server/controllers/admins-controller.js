let User = require('mongoose').model('User')

module.exports = {
  all: (req, res) => {
    User.find({}, function(err, users){
      let admins = users.filter(function(user) {
        return user._doc.roles.indexOf('Admin') > -1
      })
      
      res.render('admins/all', {admins: admins})
    })
  }, add: (req, res) => {
    User.find({}, function(err, users){
      let usersNotAdmins = users.filter(function(user) {
        return user._doc.roles.indexOf('Admin') === -1
      })
      
      res.render('admins/add', {users: usersNotAdmins})
    })
  }, update: (req, res) => {
    // update user to be admin
    console.log('add admin method')
  }
}
