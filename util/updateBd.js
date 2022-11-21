const User = require('../models/user')
const Role = require("../models/role");

const updateBd = async () => {
  const role = await Role.findOne({ value: "INVESTOR" })
  const allInvestors = await User.find({ role: role.value })

  await allInvestors.map(( investor ) => {
    if(investor.capital.totalAmountInvestment > 0) {
      let newTotalAmount;
      newTotalAmount = (investor.capital.totalAmountInvestment * process.env.BASIC_RATE / 100) + investor.capital.totalAmountInvestment
      investor.capital.totalAmountInvestment = newTotalAmount.toFixed(2)
      investor.save()
    }
  })
}

module.exports = updateBd;