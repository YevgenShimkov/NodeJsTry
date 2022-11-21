const User = require('../models/user')
const Role = require('../models/role')
const Investment = require("../models/investment");

exports.getAllInvestors = async ( req, res, next ) => {
  try {
    const role = await Role.findOne({ value: "INVESTOR" })
    const allInvestors = await User.find({ role: role.value })
    const allCapital = req.user.capital.totalAmountInvestment - process.env.START_CAPITAL

    res.render('admin/all-investors', {
      user: req.session.user,
      pageTitle: "All investors",
      path: '/all-investors',
      investors: allInvestors,
      allCapital: allCapital
    })
  } catch(err) {
    console.log(err)
  }

}

exports.getAllCapital = async ( req, res, next ) => {
  try {
    const allCapital = req.user.capital.totalAmountInvestment
    const startup = process.env.START_CAPITAL

    res.render('admin/capital', {
      user: req.session.user,
      pageTitle: "Capital",
      path: '/capital',
      allCapital: allCapital,
      startup: startup,
    })
  } catch(err) {
    console.log(err)
  }
}

exports.postWithdrawCapital = async (req, res, next) => {
  try {
    const allCapital = req.user.capital.totalAmountInvestment
    const startup = process.env.START_CAPITAL
    const amount = await req.body.amount


    if(allCapital < amount) {
      return res.render('basic/error-message', {
        user: req.session.user,
        pageTitle: 'Error Message',
        path: 'Error message',
        errorMessage: 'Sorry, you don\'t have enough money in your account'
      });
    }

    const investment = await new Investment({
      amount: -amount,
      userId: req.user
    });
    const newInvestment = await investment.save()
    console.log('Withdraw money');
    await req.user.addInvestmentToAdmin(newInvestment)

    const newAllCapital = req.user.capital.totalAmountInvestment

    return res.render('admin/capital', {
      user: req.session.user,
      pageTitle: "Capital",
      path: '/capital',
      startup: startup,
      allCapital: newAllCapital
    })
  } catch(err) {
    console.log(err)
  }
}
