const { User } = require('../models')

class SessionController {
  create (req, res) {
    res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuario não encontrado')
      return res.redirect('/signin')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha Incorreta !')
      return res.redirect('/signin')
    }

    req.session.user = user
    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/signin')
    })
  }
}

module.exports = new SessionController()
