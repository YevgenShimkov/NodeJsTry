const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: [{
    type: String,
    ref: 'Role',
    required: true
  }],
  capital: {
    investment: [
      {
        investmentId: {
          type: Schema.Types.ObjectId,
          ref: 'Investment',
          required: true
        },
        amount: {
          type: Number,
          required: true,
          default: 0,
        }
      }
    ],
    totalAmountInvestment: {
      type: Number,
      required: true,
      default: 0,
    },
  },
})

userSchema.methods.addInvestment = function( invest ) {
  let newTotalAmountInvestment;
  newTotalAmountInvestment = this.capital.totalAmountInvestment + invest.amount
  const updatedCapitalInvest = [...this.capital.investment];

  updatedCapitalInvest.push({
    investmentId: invest._id,
    amount: invest.amount
  });

  const updatedCapital = {
    investment: updatedCapitalInvest,
    totalAmountInvestment: newTotalAmountInvestment
  };
  this.capital = updatedCapital;
  return this.save();
};

userSchema.methods.updateRole = async function( role ) {
  const updatedRoles = await [...this.role]
  await updatedRoles.push(role)
  this.role = updatedRoles
  return this.save();
};

userSchema.methods.addInvestmentToAdmin = async function( invest ) {
  let newTotalAmountInvestment;
  const adminCapital = await this.capital.totalAmountInvestment
  newTotalAmountInvestment = adminCapital + invest.amount
  const updatedCapital = {
    totalAmountInvestment: newTotalAmountInvestment
  };
  this.capital = updatedCapital;
  return this.save();
};


module.exports = model('User', userSchema)