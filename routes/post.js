const express = require("express");
const { getPosts, createPosts } = require("../controllers/post");
const { userById } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");
const { createPostValidator } = require("../validator");
//index.js file automatically reads

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignin, createPostValidator, createPosts);

//any route containing :userId app will first execute userById() method
router.param("userId", userById);

module.exports = router;
