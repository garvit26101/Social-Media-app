const express = require("express");
const {
  getPosts,
  createPosts,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  postPhoto
} = require("../controllers/post");
const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");
//index.js file automatically reads

const router = express.Router();

router.get("/posts", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPosts,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

//photo
router.get('/post/photo/:postId', postPhoto);

//any route containing :userId app will first execute userById() method
router.param("userId", userById);
//any route containing :postId app will first execute postById() method
router.param("postId", postById);

module.exports = router;
