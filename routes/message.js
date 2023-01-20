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
