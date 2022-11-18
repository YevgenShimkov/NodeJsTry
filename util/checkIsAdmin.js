// helpers function
// check if admin
const Role = require("../models/role");

module.exports = async ( req ) => {
  const adminRole = await Role.findOne({ value: 'ADMIN' })
  let isAdmin = false
  req.session.user && req.session.user.role.forEach(role => {
    if( role === adminRole.value ) {
      isAdmin = true
    }
  })
  return isAdmin
}