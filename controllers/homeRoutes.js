const router = require('express').Router();


// GET all muscleData for homepage
router.get('/', async (req, res) => {
  try {
      res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/tracker', async (req, res) => {
  try {
      res.render('tracker', {
        loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});
// app.use("/assets", express.static('./assets/'));

router.get('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.render('homepage');
    });
  } else {
    res.render('homepage');
  }
});




module.exports = router;




