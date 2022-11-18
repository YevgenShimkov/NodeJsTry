const express = require('express');

const basicController = require('../controllers/basic');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', basicController.getHome);

router.get('/my-investments', isAuth, basicController.getInvestments);

// router.get('/products/:productId', basicController.getProduct);
//
// router.get('/cart', isAuth, basicController.getCart);

router.post('/add-investment', isAuth, basicController.postAddInvestment);
//
// router.post('/cart', isAuth, basicController.postCart);
//
// router.post('/cart-delete-item', isAuth, basicController.postCartDeleteProduct);
//
// router.post('/create-order', isAuth, basicController.postOrder);
//
// router.get('/orders', isAuth, basicController.getOrders);

module.exports = router;
