const { User } = require('../models')

class UserController {
  create (req, res) {
    res.render('auth/signup')
  }

  async store (req, res) {
    const { filename: avatar } = req.file
    await User.create({ ...req.body, avatar })
    res.render('/app/dashboard')
  }
}

module.exports = new UserController()
