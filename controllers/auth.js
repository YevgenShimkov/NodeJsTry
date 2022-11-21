const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require("../models/role");

exports.getLogin = ( req, res, next ) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
  });
};

exports.getSignup = ( req, res, next ) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
  });
};

exports.postLogin = async ( req, res, next ) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email })
    if( !user ) {
      return res.redirect('/login');
    }
    const doMatch = await bcrypt.compare(password, user.password)
    try {
      if( doMatch ) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      }
      // res.redirect('/login');
      res.render('basic/error-message', {
        user: req.session.user,
        pageTitle: 'Error Message',
        path: 'Error message',
        errorMessage: 'Incorrect username or password',
      });
    } catch(err) {
      console.log(err)
    }
  } catch(err) {
    console.log(err)
  }
};

exports.postSignup = async ( req, res, next ) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const isCreated = await User.findOne({ email: email })
    if( isCreated ) {
      return res.render('basic/error-message', {
        user: req.session.user,
        pageTitle: 'Error Message',
        path: 'Error message',
        errorMessage: 'This user is already registered',
      });
    }
    const userRole = await Role.findOne({ value: 'BASIC' })
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ // створення нового USER
      email: email,
      password: hashedPassword,
      role: [userRole.value],
      capital: {
        investment: [],
        totalAmountInvestment: 0
      },
    });
    await user.save()
    res.redirect('/login');
  } catch(err) {
    console.log(err)
  }
};

exports.postLogout = ( req, res, next ) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
