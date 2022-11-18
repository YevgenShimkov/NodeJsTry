const Investment = require('../models/investment');
const Order = require('../models/order');
const User = require('../models/user')

// exports.getInvestments = (req, res, next) => {
//   Investment.find()
//     .then(products => {
//       res.render('shop/product-list', {
//         prods: products,
//         pageTitle: 'All Products',
//         path: '/products'
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
//
// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       res.render('shop/product-detail', {
//         product: product,
//         pageTitle: product.title,
//         path: '/products'
//       });
//     })
//     .catch(err => console.log(err));
// };
//
exports.getHome = ( req, res, next ) => {
  res.render('basic/index', {
    user: req.session.user,
    pageTitle: 'WWW',
    path: '/'
  });
};
//

exports.getInvestments = async ( req, res, next ) => {
  try {
    const user = await req.user
      .populate('capital.investment.investmentId')
      .execPopulate()
    const investment = await user.capital.investment
    const totalAmount = await user.capital.totalAmount
    res.render('basic/my-investments', {
      path: '/my-investments',
      pageTitle: 'Your investments',
      totalAmount: totalAmount,
      investment: investment
    });
  } catch(err) {
    console.log(err)
  }
};
//
// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then(product => {
//       return req.user.addToCart(product);
//     })
//     .then(result => {
//       res.redirect('/cart');
//     });
// };
//
// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .removeFromCart(prodId)
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => console.log(err));
// };
//
// exports.postOrder = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .execPopulate()
//     .then(user => {
//       const products = user.cart.items.map(i => {
//         return { quantity: i.quantity, product: { ...i.productId._doc } };
//       });
//       const order = new Order({
//         user: {
//           email: req.user.email,
//           userId: req.user
//         },
//         products: products
//       });
//       return order.save();
//     })
//     .then(result => {
//       return req.user.clearCart();
//     })
//     .then(() => {
//       res.redirect('/orders');
//     })
//     .catch(err => console.log(err));
// };
//
// exports.getOrders = (req, res, next) => {
//   Order.find({ 'user.userId': req.user._id })
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Your Orders',
//         orders: orders
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.postAddInvestment = async ( req, res, next ) => {
  try {
    const amount = await req.body.amount;
    const investment = await new Investment({
      amount: amount,
      userId: req.user
    });

    const newInvestment = await investment.save()
    console.log('Investment created');
    req.user.addInvestment(newInvestment)
    res.redirect('/my-investments');
  } catch(err) {
    console.log(err);
  }
};
