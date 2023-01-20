const { Router } = require("express");
const authController = require("../controllers/autha");

const router = Router();
/**
 * @swagger
 *   /api/auth/register:
 *    post:
 *      tags: [Authentication]
 *      summary:  used to register a new user
 *      description: used to register a new user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Auth"
 *      responses:
 *          201:
 *            description: the user was succcessful created
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Auth"
 *
 *
 *
 *
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Auth:
 *              type: object
 *              properties:
 *                  username:
 *                          type: string
 *                  email:
 *                          type: string
 *                  password:
 *                          type: string
 *                  profilePic:
 *                           type: string
 *
 */
router.post("/register", authController.signup_post);

/**
 * @swagger
 *   /api/auth/login:
 *    post:
 *      tags: [Authentication]
 *      summary:  this api  helps to login if you create an account
 *      description:  used to login
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: "#components/schemas/Auth"
 *
 *      responses:
 *          400:
 *            description: password do n't match
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Auth"
 *          200:
 *            description: login successful!
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Auth"
 *            404:
 *              description: user not found!
 *              content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Auth"
 */

router.post("/login", authController.login);
module.exports = router;
