const Investment = require('../models/investment');
const User = require('../models/user');
const checkRole = require("../util/checkRole");

exports.getHome = ( req, res, next ) => {
  res.render('basic/index', {
    user: req.session.user,
    pageTitle: 'WWW',
    path: '/'
  });
};

exports.getErrorMessage = ( req, res, next ) => {
  res.render('basic/error-message', {
    user: req.session.user,
    pageTitle: 'Error Message',
    path: 'Error message',
    errorMessage: '',
  });
};


exports.getInvestments = async ( req, res, next ) => {
  try {
    const user = await req.user
      .populate('capital.investment.investmentId')
      .execPopulate()
    const investment = user.capital.investment
    const totalAmountInvestment = user.capital.totalAmountInvestment
    res.render('basic/my-investments', {
      path: '/my-investments',
      pageTitle: 'Your investments',
      totalAmountInvestment: totalAmountInvestment,
      investment: investment,
    });
  } catch(err) {
    console.log(err)
  }
};

exports.postAddInvestment = async ( req, res, next ) => {
  try {
    const amount = await req.body.amount;
    const investment = await new Investment({
      amount: amount,
      userId: req.user
    });
    let isAlreadyHaveRole = await checkRole(req, 'INVESTOR')
    if( !isAlreadyHaveRole ) {
      await req.user.updateRole('INVESTOR')
    }

    const newInvestment = await investment.save()
    console.log('Investment created');
    await req.user.addInvestment(newInvestment)
    const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL })
    await adminUser.addInvestmentToAdmin(newInvestment)
    res.redirect('/my-investments');
  } catch(err) {
    console.log(err);
  }
};

exports.postWithdrawInvestment = async ( req, res, next ) => {
  try {
    const amount = await req.body.amount;
    const investmentAmount = req.user.capital.totalAmountInvestment;
    const adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL })
    const adminCapital = adminUser.capital.totalAmountInvestment
    if( investmentAmount < amount || adminCapital < amount) {
      return res.render('basic/error-message', {
        user: req.session.user,
        pageTitle: 'Error Message',
        path: 'Error message',
        errorMessage: 'Sorry, you don\'t have enough money in your account'
      });
    }

    let isInvestor = await checkRole(req, 'INVESTOR')
    if( isInvestor ) {
      const investment = await new Investment({
        amount: -amount,
        userId: req.user
      });
      const newInvestment = await investment.save()
      console.log('Withdraw money');
      await adminUser.addInvestmentToAdmin(newInvestment)
      await req.user.addInvestment(newInvestment)
      res.redirect('/my-investments');
    }
  } catch(err) {
    console.log(err);
  }
};
