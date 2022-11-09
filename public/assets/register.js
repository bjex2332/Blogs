var express = require('express');
var router = express.Router();

var Register = require('/models/user.js');


router.post('/', (req, res, next) => {

  

   
   var name = req.body.name;
    var email = req.body.name;
    var password = req.body.password;
    
   
    errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        var userData = new Register({
            email: email,
            name: name,
            password: password
        });
        Register.createUser(userData, function (err, register) {
            console.log(err, register);
        });
       
        req.flash('success', 'User Added');
        res.redirect('assets/Login');
        next.localStorage.setItem("userData");
    }

    

});



const redirectTodashboard = (req, res, next) => {
    if(!req.session.passport) {
        next();
    } else {
        res.redirect('public/assets/login.js');
    }
  }
  
router.get('/public/assets/login.js', redirectTodashboard, function (req, res, next) {
    res.render('login.js', {});
});


module.exports = router;