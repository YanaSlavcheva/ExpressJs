let User = require('mongoose').model('User')

module.exports = {
  all: (req, res) => {
    User.find({}, function(err, users){
      let usersToDisplay = users.filter(function(user) {
        return user._doc.roles.indexOf('Admin') > -1
      })
      
      res.render('admins/all', {admins: usersToDisplay})
    })
  }
}
