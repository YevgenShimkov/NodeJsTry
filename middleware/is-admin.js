// check if current login user is admin
const checkRole = require('../util/checkRole')

module.exports = async ( req, res, next ) => {
  let isAdmin = await checkRole(req, "ADMIN");
  if( !isAdmin ) {
    return res.redirect('/404')
  }
  next();
}