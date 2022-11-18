const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  value: {
    type: String,
    enum: ["BASIC", "INVESTOR", "ADMIN"],
    unique: true,
    default: "BASIC"
  }
})

module.exports = model('Role',roleSchema)