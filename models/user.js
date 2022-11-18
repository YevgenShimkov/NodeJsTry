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
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    }
  },
})

userSchema.methods.addInvestment = function(invest) {
  let newTotalAmount;
  newTotalAmount = this.capital.totalAmount + invest.amount
  const updatedCapitalInvest = [...this.capital.investment];

  updatedCapitalInvest.push({
      investmentId: invest._id,
      amount: invest.amount
    });

  const updatedCapital = {
    investment: updatedCapitalInvest,
    totalAmount: newTotalAmount
  };
  this.capital = updatedCapital;
  return this.save();
};

module.exports = model('User', userSchema)