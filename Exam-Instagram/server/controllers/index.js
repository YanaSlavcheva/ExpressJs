let homeController = require('./home-controller')
let usersController = require('./users-controller')
let imagesController = require('./images-controller')
let tagsController = require('./tags-controller')
let adminsController = require('./admins-controller')

module.exports = {
  home: homeController,
  users: usersController,
  images: imagesController,
  tags: tagsController,
  admins: adminsController
}
