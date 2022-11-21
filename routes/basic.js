const express = require('express');

const basicController = require('../controllers/basic');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Basic actions
 *    description: Basic actions of registered users
 */

/**
 * @swagger
 *  /:
 *    get:
 *      tags: [Basic actions]
 *      summary: Render home page
 *      responses:
 *        "200":
 *          description: Home page
 */

router.get('/', basicController.getHome);

/**
 * @swagger
 *  /my-investments:
 *    get:
 *      tags: [Basic actions]
 *      summary: Render user investments list
 *      responses:
 *        "200":
 *          description: Investments list
 */

router.get('/my-investments', isAuth, basicController.getInvestments);

/**
 * @swagger
 *  /error-message:
 *    get:
 *      tags: [Basic actions]
 *      summary: Render error message page
 *      responses:
 *        "200":
 *          description: Error msg
 */

router.get('/error-message', isAuth, basicController.getErrorMessage);

/**
 * @swagger
 *  /add-investment:
 *    post:
 *      tags: [Basic actions]
 *      summary: Add investment
 *      responses:
 *        "200":
 *          description: Investment added successfully
 */

router.post('/add-investment', isAuth, basicController.postAddInvestment);

/**
 * @swagger
 *  /withdraw-investment:
 *    post:
 *      tags: [Basic actions]
 *      summary: Withdraw money
 *      responses:
 *        "200":
 *          description: Investment withdraw successfully
 */

router.post('/withdraw-investment', isAuth, basicController.postWithdrawInvestment);


module.exports = router;
