const router = require("express").Router();
const bcrypt = require("bcrypt");
const { protect, authorize } = require("../middlewares/auth");
const User = require("../models/User");

/**
 * @swagger
 *   /api/users:
 *    get:
 *      tags: [User]
 *      summary:  this api used to get all users
 *      description:  to get all users
 *      responses:
 *          200:
 *            description: get all users
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Post"
 *
 *
 */

router.get("/", protect, authorize("admin"), async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
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

/**
 * @swagger
 *   /api/users:
 *    put:
 *      tags: [User]
 *      summary: this api help us to update the user
 *      description: used to update user
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
 *                    $ref: "#components/schemas/User"
 *
 *      responses:
 *          200:
 *            description: user updated successfully
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/User"
 *          401:
 *            description: you can only your account!
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/User"
 *
 *
 */
//UPDATE
router.put("/:id", protect, async (req, res) => {
  if (req.user._id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can update only your account ");
  }
});

/**
 * @swagger
 *   /api/users/{id}:
 *    delete:
 *      tags: [User]
 *      summary:  this api is used to delete recorded user from mongoDb
 *      description:  used to delete user
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
 *                    $ref: "#components/schemas/User"
 *
 *      responses:
 *          200:
 *            description: User has been deleted
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/User"
 *          401:
 *            description: you can delete only your post!
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/User"
 *
 */

//delete
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  if (req.body.userId === req.params.id) {
    // try {
    //   const user = await User.findById(req.params.id);
    //   try {
    //     await this.post.deleteMany({ username: user.username });
    //     await User.findByIdAndDelete(req.params.id);
    //     res.status(200).json("User has been deleted");
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // } catch (err) {
    //   res.status(404).json("user not found");
    // }

    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User has been deleted" });
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(401).json("you can delete only your account ");
  }
});

/**
 * @swagger
 *   /api/users/{id}:
 *    get:
 *      tags: [User]
 *      summary: this api is used to  get one user
 *      description:  get one user
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Numeric ID required
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *            description: get user
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/User"
 *          401:
 *              description: user not found
 *
 *
 */

// get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    if (user.length < 1) {
      res.status(401).json({ msg: "User not found" });
    } else {
      res.status(200).json(others); 
      console.log(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
