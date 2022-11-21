// util function
// check if admin
const Role = require("../models/role");

module.exports = async ( req, searchingRole ) => {
  const role = await Role.findOne({ value: searchingRole })
  let isSearchedRole = false;
  req.user && req.user.role.forEach(r => {
    if( r === role.value ) {
      isSearchedRole = true;
    }
  })
  return isSearchedRole;
}