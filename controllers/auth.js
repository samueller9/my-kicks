module.exports = (app, models) => {
  const jwt = require('jsonwebtoken');

  function generateJWT(user) {
    const mpJWT = jwt.sign({ id: user.id,}, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

    return mpJWT
  }


  //Sign-up
app.get('/sign-up', (req, res) => {
  res.render('sign-up', {});
})
app.post('/sign-up', (req, res) => {
  console.log(req.body)
  models.User.create(req.body).then(user => {
    const mpJWT = generateJWT(user)

    res.cookie("mpJWT", mpJWT)

    res.redirect('/');
  }).catch((err) => {
    console.log(err)
  });
})


//Login
app.get('/login', (req, res) => {
  res.render('login');
})

//LOGIN (POST)
app.post('/login', (req, res, next) => {
  // console.log('hello')
  // look up user with email
  models.User.findOne({ where: { email: req.body.email } }).then(user => {
    // compare passwords
    user.comparePassword(req.body.password, function (err, isMatch) {
      // if not match send back to login
      if (!isMatch) {
        console.log('passwords do not match')
        return res.redirect('/login');
      }
      // if is match generate JWT
      const mpJWT = generateJWT(user);
      // save jwt as cookie
      res.cookie("mpJWT", mpJWT)

      res.redirect('/')
    })
  }).catch(err => {
    // if  can't find user return to login
    console.log('cannot find user: ', err)
    return res.redirect('/login');
  });
});
app.get('/logout', (req, res, next) => {
  res.clearCookie('mpJWT');

  req.session.sessionFlash = { type: 'success', message: 'Successfully logged out!' }
  return res.redirect('/');
});
};
