const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require("../models/role");
const { Schema } = require("mongoose");


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }) // пошук за email
    .then(user => {
      if (!user) { // якщо такого юзера не існую
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password) // поривнює пароль з хешу з введенним
        .then(doMatch => { // doMatch - результат compare
          if (doMatch) { // якщо пароль співпав та повернулось true
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }// якщо пароль не співпав, переадресація
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup =async (req, res, next) => {
  // console.log(req.body)
  // // поля які ввів USER при реєстрації
  const email = req.body.email;
  const password = req.body.password;

  try {
    const isCreated = await User.findOne({ email: email })
    if(isCreated) {
      return res.redirect('/signup');
    }
    const userRole = await Role.findOne({value: 'BASIC'})
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ // створення нового USER
      email: email,
      password: hashedPassword,
      role: [userRole.value],
      capital: {
        investment: [],
        totalAmount: 0
      },
    });
    await user.save()
    res.redirect('/login');
  } catch(err) {
    console.log(err)
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
