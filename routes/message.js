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








module.exports = router;
