const {
  readMessage,
  sendMessage,
  getOneMessage,
  deleteMessage,
} = require("../controllers/message");
const { protect, authorize } = require("../middlewares/auth");

const router = require("express").Router();
/**
 * @swagger
 *   /api/messages:
 *    get:
 *      tags: [message]
 *      summary:  this api used to get all messages
 *      description:  to get all messages
 *      security:
 *         - bearerAuth: []
 *      responses:
 *          200:
 *            description: get all messages
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Message"
 *
 *
 */

//post message

/**
 * @swagger
 *   /api/messages:
 *    post:
 *      tags: [message]
 *      summary:  used to send messages
 *      description: used to send messages
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Message"
 *      responses:
 *          200:
 *            description: the post was succcessful send to admin
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Message"
 *
 *
 *
 */

router
  .route("/")
  .get(protect, authorize("admin"), readMessage)
  .post(sendMessage);
router
  .route("/:id")
  .get(protect, authorize("admin"), getOneMessage)
  .delete(protect, authorize("admin"), deleteMessage);

/**
 * @swagger
 *  components:
 *      schemas:
 *          Message:
 *              type: object
 *              properties:
 *                  fullname:
 *                          type: string
 *                  email:
 *                          type: string
 *                  content:
 *                          type: string
 *
 */

//delete message
/**
 * @swagger
 *   /api/messages/{id}:
 *    delete:
 *      tags: [message]
 *      summary:  this api is used to delete recorded message from mongoDb
 *      description:  used to delete message
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID required
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                    $ref: "#components/schemas/Post"
 *
 *      responses:
 *          200:
 *            description: message has been deleted
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Message"
 *          401:
 *            description: you can delete message!
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Message"
 *
 */
//get message by id

/**
 * @swagger
 *   /api/messages/{id}:
 *    get:
 *      tags: [message]
 *      summary: AA this api is used to get one message we select
 *      description: this api show us post we want
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID required
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *            description: to test get method
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Message"
 *          500:
 *              description: internal server error
 *
 *
 */

module.exports = router;
