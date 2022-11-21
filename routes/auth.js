const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Authentication
 *    description: Management for user login and registration status
 */

/**
 * @swagger
 *  /login:
 *    get:
 *      tags: [Authentication]
 *      summary: Render login page
 *      responses:
 *        "200":
 *          description: The login form
 */

router.get('/login', authController.getLogin);

/**
 * @swagger
 *  /signup:
 *    get:
 *      tags: [Authentication]
 *      summary: Render login page
 *      responses:
 *        "200":
 *          description: The signup form
 */

router.get('/signup', authController.getSignup);

/**
 * @swagger
 *  /login:
 *    post:
 *      tags: [Authentication]
 *      summary: Check login and password
 *      consumers:
 *        - application/json
 *      parameters:
 *        - name: data
 *          in: body
 *          description: The user email and password for login
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        "200":
 *          description: Redirect on home page
 *        "302":
 *          description: Login or password not found
 */

router.post('/login', authController.postLogin);

/**
 * @swagger
 *  /signup:
 *    post:
 *      tags: [Authentication]
 *      consumers:
 *        - application/json
 *      parameters:
 *        - name: data
 *          in: body
 *          description: The user email and password for registration
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        "200":
 *          description: Redirect on login
 *        "302":
 *          description: Login or password not correct
 */

router.post('/signup', authController.postSignup);

/**
 * @swagger
 *  /logout:
 *    post:
 *      tags: [Authentication]
 *      summary: Logout and delete session
 *      responses:
 *        "200":
 *          description: Redirect on login
 */

router.post('/logout', authController.postLogout);

module.exports = router;