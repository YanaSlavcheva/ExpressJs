const controllers = require('../controllers')
const auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)

  app.get('/users/register', controllers.users.register)
  app.post('/users/create', controllers.users.create)
  app.get('/users/login', controllers.users.login)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)

  app.get('/images/add', auth.isAuthenticated, controllers.images.add)
  app.post('/images/create', auth.isAuthenticated, controllers.images.create)

  app.get('/tag/:tagName', controllers.tags.index)
  app.get('/profile/:username', controllers.users.profile)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
