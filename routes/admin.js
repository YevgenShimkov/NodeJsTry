const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();
//запрос обробляется з ліва на право ----------->
// якщо isAuth виконаєтся та передасть NEXT то відбудется далі виконання adminController.getAddProduct
// /admin/add-product => GET
// router.get('/add-product', isAuth, isAdmin, adminController.getAddProduct);

// // /admin/products => GET
// router.get('/products', isAuth, adminController.getProducts);
//
// // /admin/add-product => POST
// router.post('/add-product', isAuth, isAdmin, adminController.postAddProduct);
//
// router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
//
// router.post('/edit-product', isAuth, adminController.postEditProduct);
//
// router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
