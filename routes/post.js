const express = require("express");
const { getPosts, createPosts } = require("../controllers/post");
const validator = require("../validator");
//index.js file automatically reads

const router = express.Router();

router.get("/", getPosts);
router.post("/post", validator.createPostValidator, createPosts);

module.exports = router;
