const express = require("express");
const { getPosts, createPosts, postsByUser,postById,isPoster,deletePost  } = require("../controllers/post");
const { userById} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");
//index.js file automatically reads

const router = express.Router();

router.get("/", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPosts,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.delete("/post/:postId",requireSignin,isPoster,deletePost);

//any route containing :userId app will first execute userById() method
router.param("userId", userById);
//any route containing :postId app will first execute postById() method
router.param("postId", postById);

module.exports = router;
