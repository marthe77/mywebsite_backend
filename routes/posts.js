const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { protect, authorize } = require("../middlewares/auth");

/**
 * @swagger
 *   /api/posts:
 *    post:
 *      tags: [Post]
 *      summary:  used to insert data to database
 *      description: used to insert post in database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Post"
 *      responses:
 *          200:
 *            description: the post was succcessful created
 *            content:
 *                application/json:
 *                  schema:
 *                      $ref: "#components/schemas/Post"
 *
 *
 *
 */

//CREATE POST
router.post("/", protect, authorize("admin"), async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 *   /api/posts:
 *    put:
 *      tags: [Post]
 *      summary: this api help us to update the post
 *      description: used to update post
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
 *            description: updated successfully
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Post"
 *          401:
 *            description: you can update only your post!
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Post"
 *
 *
 */

//UPDATE POST
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  console.log(req.user);

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 *   /api/posts/{id}:
 *    delete:
 *      tags: [Post]
 *      summary:  this api is used to delete recorded post from mongoDb
 *      description:  used to delete post
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
 *            description: Post has been deleted
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Post"
 *          401:
 *            description: you can delete only your post!
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Post"
 *
 */

//DELETE POST
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  console.log(req);
  try {
    const post = await Post.findById(req.params.id);

    try {
      await post.delete();
      res.status(200).json("Post has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like a post
router.put("/:id/like", protect, async (req, res) => {
  console.log(req.user.username);
  const post = await Post.findById(req.params.id);
  const likedPost = await post.updateOne({
    $push: { likes: req.user.username },
  });
  res.status(200).json({ msg: `post with id ${req.params.id} is liked` });
});
 

/**
 * @swagger
 *   /api/posts/{id}:
 *    get:
 *      tags: [Post]
 *      summary: AA this api is used to get one post we select
 *      description: this api show us post we want
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
 *                          $ref: "#components/schemas/Post"
 *          500:
 *              description: internal server error
 *
 *
 */

// GET one POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * @swagger
 *  components:
 *      schemas:
 *          Post:
 *              type: object
 *              properties:
 *                  username:
 *                          type: string
 *                  title:
 *                          type: string
 *                  desc:
 *                          type: string
 *                  
 *                  comments:
 *                          type: array
 *                  likes:
 *                       type: array
 */

/**
 * @swagger
 *   /api/posts:
 *    get:
 *      tags: [Post]
 *      summary: this api is used  to show us all post we have
 *      description: this api show us  all posts we have
 *      responses:
 *          200:
 *            description: to test get method
 *            content:
 *                application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref: "#components/schemas/Post"
 *
 *
 */

// GET all POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/comment/:postId/", protect, async (req, res, next) => {
  const { commentText } = req.body;
  console.log("hiiiii");
  const comment = { username: req.user.username, comment: commentText };
  const post = await Post.findById(req.params.postId);
  const newPost = await post.updateOne({
    $push: { comments: comment },
  });
  res.status(200).json({ msg: `comment sent!!!` });
});

module.exports = router;
