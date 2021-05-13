const express = require("express");
const {
  getPosts,
  createPosts,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  postPhoto,
  singlePost,
  like,
  unlike,
  comment,
  uncomment,
} = require("../controllers/post");
const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");

//index.js file automatically reads

const router = express.Router();

router.get("/posts", getPosts);

//like unlike
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

//comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);

router.post(
  "/post/new/:userId",
  requireSignin,
  createPosts,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.get("/post/:postId", singlePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

//photo
router.get("/post/photo/:postId", postPhoto);

//any route containing :userId app will first execute userById() method
router.param("userId", userById);
//any route containing :postId app will first execute postById() method
router.param("postId", postById);

module.exports = router;
