// helpers function
// check if admin
const Role = require("../models/role");

module.exports = async ( req, searchingRole ) => {
  const role = await Role.findOne({ value: searchingRole })
  let isSearchedRole = false
  req.session.user && req.session.user.role.forEach(r => {
    if( r === role.value ) {
      isSearchedRole = true
    }
  })
  return isSearchedRole
}