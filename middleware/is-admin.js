// check if current login user is admin
const checkIsAdmin = require('../util/checkIsAdmin')

module.exports = async ( req, res, next ) => {
  let isAdmin = await checkIsAdmin(req);
  if( !isAdmin ) {
    return res.redirect('/404')
  }
  next();
}