let homeController = require('./home-controller')
let usersController = require('./users-controller')
let tweetsController = require('./tweets-controller')
let tagsController = require('./tags-controller')

module.exports = {
  home: homeController,
  users: usersController,
  tweets: tweetsController,
  tags: tagsController
}
