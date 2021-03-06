const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

let requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: { type: String, required: requiredValidationMessage, unique: true, lowercase: true },
  firstName: { type: String, required: requiredValidationMessage },
  lastName: { type: String, required: requiredValidationMessage },
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    let inputHashedPassword = encryption.generateHashedPassword(this.salt, password)
    if (inputHashedPassword === this.hashedPass) {
      return true
    } else {
      return false
    }
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length === 0) {
      let salt = encryption.generateSalt()
      let hashedPassAdmin = encryption.generateHashedPassword(salt, 'Admin12')
      let hashedPassNormal = encryption.generateHashedPassword(salt, 'normal')
      let hashedPassPesho = encryption.generateHashedPassword(salt, 'pesho')

      User.create({
        username: 'Admin',
        firstName: 'Admin',
        lastName: 'Adminov',
        salt: salt,
        hashedPass: hashedPassAdmin,
        roles: ['Admin']
      },
      {
        username: 'normal',
        firstName: 'normal',
        lastName: 'normal',
        salt: salt,
        hashedPass: hashedPassNormal
      },
      {
        username: 'pesho',
        firstName: 'pesho',
        lastName: 'pesho',
        salt: salt,
        hashedPass: hashedPassPesho
      })
    }
  })
}
