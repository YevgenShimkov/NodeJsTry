const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Admin
 *    description: Admin actions
 */

/**
 * @swagger
 *  /all-investors:
 *    get:
 *      tags: [Admin]
 *      summary: Render all investors list
 *      responses:
 *        "200":
 *          description: investors list
 */

router.get('/all-investors', isAuth, isAdmin, adminController.getAllInvestors);

/**
 * @swagger
 *  /capital:
 *    get:
 *      tags: [Admin]
 *      summary: Render capital
 *      responses:
 *        "200":
 *          description: capital
 */

router.get('/capital', isAuth, isAdmin, adminController.getAllCapital);

/**
 * @swagger
 *  /withdraw-capital:
 *    post:
 *      tags: [Admin]
 *      summary: Withdraw capital
 *      responses:
 *        "200":
 *          description: Withdraw money successfully
 */

router.post('/withdraw-capital', isAuth, isAdmin, adminController.postWithdrawCapital);

module.exports = router;
