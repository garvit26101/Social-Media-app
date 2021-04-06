const express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator } = require("../validator");
//index.js file automatically reads

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

//any route containing :userId app will first execute userById() method
router.param("userId", userById);

module.exports = router;
