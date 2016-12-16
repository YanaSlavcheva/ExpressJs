module.exports = {
  index: (req, res) => {
    res.render('home/index', {tweets: [1,2,3,4,5]})
  },
  about: (req, res) => {
    res.render('home/about')
  }
}
